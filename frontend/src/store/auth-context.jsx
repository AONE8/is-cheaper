import { createContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  onSignup: (username, email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decode = jwtDecode(token);

      const currentTimestamp = Math.floor(new Date().getTime() / 1000);

      if (decode.sub && decode.exp && decode.exp > currentTimestamp) {
        setIsLoggedIn(true);
      }
    }
  }, [isLoggedIn]);

  const loginHandler = (email, password, navigate) => {
    async function postLogin() {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    }
    postLogin();
  };

  const signupHandler = (username, email, password) => {
    async function postSignup() {
      try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
        if (response.status === 401) {
          const data = await response.json();
          alert(data.message);
        }

        if (!response.ok) {
          alert("Something wrong");
        }
      } catch (error) {
        alert(error);
      }
    }

    postSignup();
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignup: signupHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
