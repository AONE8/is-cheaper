import Button from "../Button/Button";
import logo from "../../assets/isCheaperLogo.png";
import { Form, NavLink, redirect, useFetcher } from "react-router-dom";
import MainNavClasses from "./MainNavigation.module.css";

export default function MainNavigation() {
  const fetcher = useFetcher();

  return (
    <header className={MainNavClasses.header}>
      <NavLink to="/" className={MainNavClasses["logo-container"]} end>
        <figure>
          <img src={logo} alt="isCheaper Logo" />
          <figcaption>isCheaper</figcaption>
        </figure>
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? MainNavClasses.active : undefined
              }
              end
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? MainNavClasses.active : undefined
              }
              end
            >
              History
            </NavLink>
          </li>
        </ul>

        <Form method="post" action="/logout">
          <Button>Logout</Button>
        </Form>
      </nav>
    </header>
  );
}
