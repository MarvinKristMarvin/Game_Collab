import { ILabel } from "../../@types/components";
import "./Label.css";

// Displays a text label which when clicked, focuses the next input
function Label({ text, htmlFor }: ILabel) {
  return (
    <label className="labelComponent" htmlFor={htmlFor}>
      <p>{text}</p>
    </label>
  );
}

export default Label;
