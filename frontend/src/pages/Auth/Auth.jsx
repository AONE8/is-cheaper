import {
  NavLink,
  Navigate,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import logo from "../../assets/isCheaperLogo.png";
import authClasses from "../Auth/Auth.module.css";
import FormWrapper from "../../components/Form/FormWrapper";
import LoginForm from "../../components/Form/Login/Login";
import SignUpForm from "../../components/Form/SignUp/SignUp";
import CustomLink from "../../components/Link/CustomLink";
import Feedback from "../../components/FeedBack/Feedback";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const token = useLoaderData();
  const actionData = useActionData();

  const isSignUp = searchParams.get("mode") === "signup";
  const isSubmitting = navigation.state === "submitting";

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <header className={authClasses.header}>
        <NavLink
          to="/authentication"
          end
          className={authClasses["logo-container"]}
        >
          <figure>
            <img src={logo} alt="isCheaper Logo" />
            <figcaption>isCheaper</figcaption>
          </figure>
        </NavLink>
        <CustomLink
          to={`/authentication/${!isSignUp ? "?mode=signup" : ""}`}
          replace
        >
          {!isSignUp ? "Sign up" : "Login"}
        </CustomLink>
      </header>
      <main className={authClasses.main}>
        <FormWrapper
          method="post"
          caption={isSignUp ? "Sign up" : "Login"}
          isSubmitting={isSubmitting}
        >
          {actionData && actionData.message && (
            <Feedback type="rejecting">{actionData.message}</Feedback>
          )}
          {!isSignUp ? (
            <LoginForm actionData={actionData} />
          ) : (
            <SignUpForm actionData={actionData} />
          )}
        </FormWrapper>
      </main>
    </>
  );
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  console.log(mode);
  const data = await request.formData();
  console.log(data.get("email"));
  let authData = {};

  if (mode === "login") {
    if (data.get("password").length < 5) {
      console.log("not passw");
      return json(
        { error: { password: "Password must have more 5 symbols." } },
        { status: 200 }
      );
    }

    authData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 401) {
      return json({ message: "No Valid Credentials." }, { status: 200 });
    }

    if (!response.ok) {
      throw json({ message: "Server not responding!" }, { status: 500 });
    }

    const payload = await response.json();
    const token = payload.token;
    localStorage.setItem("token", token);

    return redirect("/");
  }

  if (mode === "signup") {
    if (data.get("password").length < 5) {
      console.log("not passw");
      return json(
        { error: { password: "Password must have more 5 symbols." } },
        { status: 200 }
      );
    }

    if (data.get("password") !== data.get("confirmation")) {
      return json(
        { error: { confirmation: "Confirmation is not equal to Password" } },
        { status: 200 }
      );
    }

    authData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 401) {
      const payload = await response.json();
      throw json({ message: payload.message }, { status: 401 });
    }

    if (!response.ok) {
      alert("Something wrong");
      throw json({ message: "Something wrong!" }, { status: 500 });
    }

    return redirect("/authentication");
  }
}
