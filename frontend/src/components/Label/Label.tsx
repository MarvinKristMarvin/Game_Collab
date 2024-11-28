import { ILabel } from "../../@types/components";
import "./Label.css";

function Label({ text, htmlFor }: ILabel) {
  return (
    <label className="labelComponent" htmlFor={htmlFor}>
      <p>{text}</p>
    </label>
  );
}

export default Label;
