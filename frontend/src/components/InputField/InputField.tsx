import { IInputField } from "../../@types/components";
import "./InputField.css";

function InputField({
  placeholder,
  inputType,
  inputId,
  inputName,
  onChangeHandler,
  isNumber = false,
  actualValue,
}: IInputField) {
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          if (isNumber && (value === "" || !isNaN(Number(value)))) {
            // Allow empty or numeric values only
            onChangeHandler(value);
          } else if (!isNumber) {
            onChangeHandler(value);
          }
        }}
        value={actualValue}
      ></input>
    );
  }
}

export default InputField;
