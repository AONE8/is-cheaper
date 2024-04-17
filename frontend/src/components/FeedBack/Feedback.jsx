import feedbackClasses from "./Fedback.module.css";

export default function Feedback({ type, children }) {
  let feedbackClass = "";

  if (type === "rejecting") {
    feedbackClass = feedbackClasses.reject;
  }

  if (type === "loading") {
    feedbackClass = feedbackClasses.load;
  }

  if (type === "nofounding") {
    feedbackClass = feedbackClasses.nofound;
  }

  return (
    <span className={`${feedbackClasses.feedback} ${feedbackClass}`}>
      {children}
    </span>
  );
}
