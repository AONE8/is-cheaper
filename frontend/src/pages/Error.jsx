import { useRouteError } from "react-router-dom";

export default function Error404() {
  const error = useRouteError();

  return (
    <>
      <h1 style={{ marginTop: "10rem", textAlign: "center" }}>
        {error.message || "Error occures!"}
      </h1>
    </>
  );
}
