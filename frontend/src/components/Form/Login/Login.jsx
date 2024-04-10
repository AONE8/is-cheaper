import { useContext } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import formClasses from "../Form.module.css";
import AuthContext from "../../../store/auth-context";

export default function LoginForm() {
  return (
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
