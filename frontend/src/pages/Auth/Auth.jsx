import { NavLink } from "react-router-dom";
import logo from "../../assets/isCheaperLogo.png";
import AuthHeader from "../Auth/Auth.module.css";
import Form from "../../components/Form/Form";
import { useState } from "react";
import Button from "../../components/Button/Button";

export default function Auth() {
  const [formStatus, setFormtatus] = useState("login");

  function handleChangeForm() {
    setFormtatus((prev) => (prev === "login" ? "signup" : "login"));
  }

  return (
    <>
      <header className={AuthHeader.header}>
        <NavLink
          to="/authentication"
          end
          className={AuthHeader["logo-container"]}
        >
          <figure>
            <img src={logo} alt="isCheaper Logo" />
            <figcaption>isCheaper</figcaption>
          </figure>
        </NavLink>
        <Button type="button" onClick={handleChangeForm}>
          {formStatus === "login" ? "Sign up" : "Login"}
        </Button>
      </header>
      <main className={AuthHeader.main}>
        <Form type={formStatus} setFormtatus={setFormtatus} />
      </main>
    </>
  );
}
