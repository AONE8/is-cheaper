import btnClasses from "./Button.module.css";

export default function Button({ children, ...props }) {
  return (
    <button {...props} className={btnClasses.button}>
      {children}
    </button>
  );
}
