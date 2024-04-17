import { Link } from "react-router-dom";
import linkClasses from "./CustomLink.module.css";

export default function CustomLink({ children, ...props }) {
  return (
    <Link {...props} className={linkClasses.link}>
      {children}
    </Link>
  );
}
