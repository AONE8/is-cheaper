import { useContext, useRef } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import formClasses from "./Form.module.css";
import LoginForm from "./Login/Login";
import SignUpForm from "./SignUp/SignUp";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import FilterForm from "./Filter/Filter";
import OPTIONS, { OPTIONS_VALUES } from "../../util/constants";
import { postProds } from "../../util/searchProds";

export default function Form({ type, setFormtatus }) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const formRef = useRef();

  function handleReset(event) {
    event.preventDefault();
    for (const key in formRef.current) {
      if (
        formRef.current[key] &&
        Object.hasOwnProperty.call(formRef.current[key], "value")
      ) {
        formRef.current[key].value = "";
      }
      if (
        formRef.current[key] &&
        Object.hasOwnProperty.call(formRef.current[key], "checked")
      ) {
        formRef.current[key].checked = false;
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (type === "login") {
      const data = Object.fromEntries(formData.entries());
      console.log(data);

      authCtx.onLogin(data.email, data.password);
      return;
    }

    if (type === "signup") {
      const data = Object.fromEntries(formData.entries());
      authCtx.onSignup(data.username, data.email, data.password);
      setFormtatus("login");
      return;
    }

    if (type === "filter" || !type) {
      const data = {};
      // data["battery-capacity"] = formData.getAll("battery-capacity");
      // data["display-type"] = formData.getAll("display-type");
      // data["gpu-type"] = formData.getAll("gpu-type");
      // data["processor-coret"] = formData.getAll("processor-coret");
      // data["ram"] = formData.getAll("ram");
      // data["ram-type"] = formData.getAll("ram-type");
      // data["screen-size"] = formData.getAll("screen-size");

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
          console.log(data[key]);
        }
      }

      console.log(JSON.stringify(data));

      postProds(data, handleReset.bind(null, event));

      // for (const key in formRef.current) {
      //   if (
      //     formRef.current[key] &&
      //     Object.hasOwnProperty.call(formRef.current[key], "value")
      //   ) {
      //     formRef.current[key].value = "";
      //   }
      //   if (
      //     formRef.current[key] &&
      //     Object.hasOwnProperty.call(formRef.current[key], "checked")
      //   ) {
      //     formRef.current[key].checked = false;
      //   }
      // }
    }
  }

  let formContent;
  let caption;

  if (!type || type === "filter") {
    caption = "Filter";
    formContent = <FilterForm />;
  }

  if (type === "signup") {
    caption = "Sign up";
    formContent = <SignUpForm />;
  }

  if (type === "login") {
    caption = "Login";
    formContent = <LoginForm />;
  }

  return (
    <form
      action=""
      className={formClasses.form}
      onSubmit={handleSubmit}
      onReset={handleReset}
      ref={formRef}
    >
      <h1>{caption}</h1>
      {formContent}
    </form>
  );
}
