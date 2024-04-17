import { useState } from "react";
import OPTIONS from "../../../util/constants";
import SelectClasses from "./SelectInput.module.css";

let valueOption = "";

function filterOptions(option) {
  return (brand) =>
    brand.toLowerCase().startsWith(option.toLowerCase()) &&
    brand.toLowerCase() !== option.toLowerCase();
}

export default function SelectInput({
  name,
  classes,
  label,
  options,
  inputSelectState,
  setInputSelectState,
}) {
  const value = inputSelectState[name];

  let isVisible =
    options.some(filterOptions(value)) && value !== "" && value !== valueOption;

  function handleChange(event) {
    const enteredText = event.target.value;
    setInputSelectState((prev) => ({ ...prev, [name]: enteredText }));
  }

  function handleOptionPick(event) {
    const selectedOption = event.target.value;
    setInputSelectState((prev) => ({ ...prev, [name]: selectedOption }));
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
