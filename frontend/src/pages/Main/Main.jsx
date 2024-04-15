import Form from "../../components/Form/Form";
import Result from "../../components/Result/Result";
import MainPageClasses from "./Main.module.css";

export default function Main() {
  return (
    <>
      <section className={MainPageClasses["filter-section"]} id="main">
        <Form />
      </section>
      <section className={MainPageClasses["result-section"]} id="result">
        <Result />
      </section>
    </>
  );
}
