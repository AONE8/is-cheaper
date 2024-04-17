import Feedback from "../../FeedBack/Feedback";
import Input from "../../Input/Input";

export default function LoginForm({ actionData }) {
  return (
    <>
      <Input label="E-mail" type="email" name="email" />

      {actionData &&
        actionData.error &&
        actionData &&
        actionData.error.password && (
          <Feedback type="rejecting">{actionData.error.password}</Feedback>
        )}

      <Input label="Password" type="password" name="password" />
    </>
  );
}
