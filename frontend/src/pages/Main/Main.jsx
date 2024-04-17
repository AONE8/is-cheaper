import {
  json,
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import FilterForm from "../../components/Form/Filter/Filter";
import FormWrapper from "../../components/Form/FormWrapper";
import Result from "../../components/Result/Result";
import MainPageClasses from "./Main.module.css";
import OPTIONS, { OPTIONS_VALUES } from "../../util/constants";
import { useState } from "react";
import Feedback from "../../components/FeedBack/Feedback";

export default function Main() {
  const [inputSelectState, setInputSelectState] = useState({
    producer: "",
    processor: "",
    "obyom-ssd": "",
    "god-vipuska-255456": "",
  });

  const actionData = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [isEmpty, setIsEmpty] = useState();

  const isSubmitting = navigation.state === "submitting";

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let isFormDataEmpty = true;
    for (let entry of formData.entries()) {
      if (entry[1]) {
        isFormDataEmpty = false;
        break;
      }
    }

    if (isFormDataEmpty) {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);

    handleReset(event);

    submit(formData, {
      action: "/?index",
      method: "post",
    });
  }

  function handleReset(event) {
    event.preventDefault();

    const resetState = Object.keys(inputSelectState).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});

    setInputSelectState(resetState);

    for (const key in event.target) {
      if (
        event.target[key] &&
        Object.hasOwnProperty.call(event.target[key], "checked")
      ) {
        event.target[key].checked = false;
      }
    }
  }

  return (
    <>
      <section className={MainPageClasses["filter-section"]} id="main">
        <FormWrapper
          caption="Filter"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onReset={handleReset}
          action="/?index"
          method="post"
        >
          {isEmpty && (
            <Feedback type="rejecting">
              Form is empty. Enter some option for getting a product.
            </Feedback>
          )}
          <FilterForm
            inputSelectState={inputSelectState}
            setInputSelectState={setInputSelectState}
          />
        </FormWrapper>
      </section>
      <section className={MainPageClasses["result-section"]} id="result">
        {actionData && actionData.productName && (
          <Result product={actionData} />
        )}
        {actionData && actionData.message && (
          <Feedback type="nofounding">{actionData.message}</Feedback>
        )}
      </section>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = {};

  for (const key in OPTIONS_VALUES) {
    if (formData.getAll(key).length !== 0 && formData.getAll(key)[0]) {
      let items = Array.from(formData.getAll(key));
      items = items.map((el) => {
        const index = OPTIONS[key].indexOf(el);
        if (index !== -1) {
          return OPTIONS_VALUES[key][index];
        }
        return el;
      });

      data[key] = items;
    }
  }

  try {
    const response = await fetch("http://localhost:8080/api/products/search", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      return redirect("/authentication");
    }

    if (response.status === 404) {
      return json({ message: "Not found product" }, { status: 200 });
    }

    if (!response.ok) {
      throw json({ message: "Something wrong" }, { status: 500 });
    }

    const message = await response.json();

    return message;
  } catch (error) {
    throw json({ message: error.message }, { status: 500 });
  }
}
