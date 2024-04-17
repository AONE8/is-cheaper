import { json, redirect, useLoaderData } from "react-router-dom";
import historyClasses from "./History.module.css";
import Feedback from "../../components/FeedBack/Feedback";

export default function History() {
  const historyProds = useLoaderData();

  return (
    <div className={historyClasses["history-section"]}>
      {historyProds && historyProds.message && (
        <Feedback type="rejecting">{historyProds.message}</Feedback>
      )}
      <ul>
        {historyProds &&
          historyProds.products &&
          historyProds.products.map((prod) => (
            <li
              key={prod.productName}
              className={historyClasses["history-item"]}
            >
              <div className={historyClasses["content"]}>
                <div className={historyClasses["image-container"]}>
                  <img src={prod.imgUrl} alt={prod.productName} />
                </div>
                <div className={historyClasses["info-container"]}>
                  <h3>{prod.productName}</h3>
                  <p>{prod.price} &#8372;</p>
                </div>
              </div>
              <div className={historyClasses["link"]}>
                <a href={prod.locationUrl} target="_blank">
                  Go to product
                </a>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const response = await fetch(`${REACT_APP_BACKEND_API}/products/history`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "GET",
  });

  if (response.status === 401) {
    return redirect("/authentication");
  }

  if (!response.ok) {
    return json({ message: "Server not responding" }, { status: 200 });
  }

  const historyProds = await response.json();

  return json({ products: historyProds }, { status: 200 });
}
