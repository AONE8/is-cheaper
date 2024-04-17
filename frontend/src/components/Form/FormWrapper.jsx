import { Form } from "react-router-dom";
import Button from "../Button/Button";

import formClasses from "./FormWrapper.module.css";
import Feedback from "../FeedBack/Feedback";

export default function FormWrapper({
  caption,
  isSubmitting,
  children,
  ...props
}) {
  return (
    <Form className={formClasses.form} {...props}>
      <h1>{caption}</h1>
      {children}
      {isSubmitting ? (
        <Feedback type="loading">Submitting...</Feedback>
      ) : (
        <div className={formClasses["btn-container"]}>
          <Button type="reset">Reset</Button>

          <Button type="submit">Submit</Button>
        </div>
      )}
    </Form>
  );
}
