import Button from "../Button/Button";
import Input from "../Input/Input";
import formClasses from "./Form.module.css";

export default function Form({ type }) {
  let formContent;
  let caption;

  if (!type || type === "filter") {
    caption = "Filter";
    formContent = "";
  }

  if (type === "signup") {
    caption = "Sign up";
    formContent = (
      <>
        <Input label="Username" type="text" name="username" />

        <Input label="E-mail" type="email" name="email" />

        <Input label="Password" type="password" name="password" />
        <Input label="Confirmation" type="password" name="confirmation" />

        <div className={formClasses["btn-container"]}>
          <Button type="reset">Reset</Button>

          <Button type="submit">Submit</Button>
        </div>
      </>
    );
  }

  if (type === "login") {
    caption = "Login";
    formContent = (
      <>
        <Input label="E-mail" type="email" name="email" />

        <Input label="Password" type="password" name="password" />

        <div className={formClasses["btn-container"]}>
          <Button type="reset">Reset</Button>

          <Button type="submit">Submit</Button>
        </div>
      </>
    );
  }

  return (
    <form action="" className={formClasses.form}>
      <h1>{caption}</h1>
      {formContent}
    </form>
  );
}
