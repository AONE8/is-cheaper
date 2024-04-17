import Input from "../../Input/Input";
import Feedback from "../../FeedBack/Feedback";

export default function SignUpForm({ actionData }) {
  return (
    <>
      <Input label="Username" type="text" name="username" />

      <Input label="E-mail" type="email" name="email" />
      {actionData &&
        actionData.error &&
        actionData &&
        actionData.error.password && (
          <Feedback type="rejecting">{actionData.error.password}</Feedback>
        )}
      <Input label="Password" type="password" name="password" />
      {actionData &&
        actionData.error &&
        actionData &&
        actionData.error.confirmation && (
          <Feedback type="rejecting">{actionData.error.confirmation}</Feedback>
        )}
      <Input label="Confirmation" type="password" name="confirmation" />
    </>
  );
}
