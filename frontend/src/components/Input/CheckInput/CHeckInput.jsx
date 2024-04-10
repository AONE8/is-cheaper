import { useState } from "react";
import OPTIONS from "../../../util/constants";
import CheckInputClasses from "./CheckInput.module.css";

export default function CheckInput({ name, label, classes, options }) {
  return (
    <div className={CheckInputClasses["input-container"]}>
      <label className={CheckInputClasses["label"]}>{label}</label>
      <ul className={CheckInputClasses["checkbox-list"]}>
        {options.map((option, index) => {
          return (
            <li key={option}>
              <input
                type={"checkbox"}
                name={name}
                id={name + index}
                value={option}
              />
              <label htmlFor={name + index}>
                <span></span>
                {option}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
