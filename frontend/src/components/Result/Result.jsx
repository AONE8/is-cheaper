import resultClasses from "./Result.module.css";

// const DUMMY_RESULT = {
//   productName: `Ноутбук ASUS VivoBook 17X M3704YA-AU091 (90NB1192-M003Z0) Indie Black / 17.3" IPS Full HD / AMD Ryzen 5 / RAM 16 ГБ / SSD 1 ТБ`,
//   imgUrl: "https://content.rozetka.com.ua/goods/images/big/386671380.jpg",
//   locationUrl: "https://rozetka.com.ua/ua/asus-90nb1192-m003z0/p407423565/",
//   price: 23999.0,
// };

export default function Result({ product }) {
  return (
    <div className={resultClasses["result"]}>
      <h3>Result of searching</h3>
      <div className={resultClasses["image-container"]}>
        <img src={product.imgUrl} alt={product.productName} />
        <span>{product.productName}</span>
      </div>
      <div className={resultClasses["price-container"]}>
        <span>{product.price} &#8372;</span>
      </div>
      <div className={resultClasses["link-container"]}>
        <a href={product.locationUrl} target="_blank">
          Go to product
        </a>
      </div>
    </div>
  );
}
