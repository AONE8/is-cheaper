import Button from "../../Button/Button";
import Input from "../../Input/Input";
import formClasses from "../Form.module.css";

export default function SignUpForm() {
  return (
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
