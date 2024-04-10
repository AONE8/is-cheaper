import Button from "../Button/Button";
import logo from "../../assets/isCheaperLogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import MainNavClasses from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

export default function MainNavigation() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  function handleClick() {
    authCtx.onLogout();
    navigate("/");
  }

  return (
    <header className={MainNavClasses.header}>
      <NavLink
        to="/authentication"
        className={MainNavClasses["logo-container"]}
        end
      >
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

        <Button type="button" onClick={handleClick}>
          Logout
        </Button>
      </nav>
    </header>
  );
}
