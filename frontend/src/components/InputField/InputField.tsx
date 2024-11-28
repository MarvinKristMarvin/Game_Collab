import { IInpurField } from "../../@types/components";
import "./InputField.css";

function InputField({
  placeholder,
  inputType,
  inputId,
  inputName,
}: IInpurField) {
  if (inputType === "textarea") {
    return (
      <textarea
        id={inputId}
        name={inputName}
        placeholder={placeholder}
        className="inputFieldComponent textarea"
        rows={8}
        maxLength={800}
      />
    );
  } else {
    return (
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        placeholder={placeholder}
        className="inputFieldComponent"
      ></input>
    );
  }
}

export default InputField;
