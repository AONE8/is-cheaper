import { useState } from "react";
import OPTIONS from "../../../util/constants";
import SelectClasses from "./SelectInput.module.css";

let valueOption = "";

function filterOptions(option) {
  return (brand) =>
    brand.toLowerCase().startsWith(option.toLowerCase()) &&
    brand.toLowerCase() !== option.toLowerCase();
}

export default function SelectInput({ name, classes, label, options }) {
  const [value, setValue] = useState("");
  // const [isVisible, setIsVisible] = useState(false);

  let isVisible =
    options.some(filterOptions(value)) && value !== "" && value !== valueOption;

  // console.log(
  //   `value: ${value}, valueOPtion: ${valueOption}, isVisible: ${isVisible}`
  // );

  function handleChange(event) {
    const enteredText = event.target.value;
    setValue(enteredText);
  }

  function handleOptionPick(event) {
    valueOption = event.target.value;

    setValue(valueOption);
  }

  return (
    <div className={classes["input-container"]}>
      <input
        type={"text"}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder=""
        required
      />
      <label htmlFor={name}>{label}</label>
      {isVisible && (
        <div className={SelectClasses.tooltip}>
          <ul>
            {options.filter(filterOptions(value)).map((brand) => {
              return (
                <li key={brand}>
                  <input
                    type="radio"
                    name="brands-option"
                    id={brand.toLowerCase()}
                    value={brand}
                    onClick={handleOptionPick}
                  />
                  <label htmlFor={brand.toLowerCase()}>{brand}</label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
