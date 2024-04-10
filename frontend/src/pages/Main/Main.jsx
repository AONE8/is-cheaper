import Form from "../../components/Form/Form";
import MainPageClasses from "./Main.module.css";

export default function Main() {
  return (
    <>
      <section className={MainPageClasses["filter-section"]}>
        <Form />
      </section>
      <section className={MainPageClasses["result-section"]}>Result</section>
    </>
  );
}
