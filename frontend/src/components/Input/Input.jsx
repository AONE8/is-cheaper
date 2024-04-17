import inputClasses from "./Input.module.css";
import OPTIONS from "../../util/constants";
import SelectInput from "./SelectInput/SelectInput";
import CheckInput from "./CheckInput/CHeckInput";

export default function Input({
  label,
  type,
  name,
  options,
  options_value,
  inputSelectState,
  setInputSelectState,
}) {
  if (type === "select") {
    return (
      <SelectInput
        name={name}
        label={label}
        classes={inputClasses}
        options={options}
        inputSelectState={inputSelectState}
        setInputSelectState={setInputSelectState}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <CheckInput
        name={name}
        label={label}
        classes={inputClasses}
        options={options}
        options_value={options_value}
      />
    );
  }
  return (
    <div className={inputClasses["input-container"]}>
      <input type={type} name={name} id={name} placeholder="" required />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
