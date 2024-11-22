import "./Label.css";

interface props {
  text: string;
  htmlFor: string;
}

function Label({ text, htmlFor }: props) {
  return (
    <label className="labelComponent" htmlFor={htmlFor}>
      <p>{text}</p>
    </label>
  );
}

export default Label;
