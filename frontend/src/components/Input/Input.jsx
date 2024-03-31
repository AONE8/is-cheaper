import inputClasses from "./Input.module.css";

export default function Input({ label, type, name }) {
  return (
    <div className={inputClasses["input-container"]}>
      <input type={type} name={name} id={name} placeholder="" required />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
