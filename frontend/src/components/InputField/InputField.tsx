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
        onChange={
          onChangeHandler
            ? (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const value = e.target.value;
                onChangeHandler(value);
              }
            : undefined
        }
        value={actualValue}
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
        onChange={
          onChangeHandler
            ? (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (isNumber && (value === "" || !isNaN(Number(value)))) {
                  onChangeHandler(value);
                } else if (!isNumber) {
                  onChangeHandler(value);
                }
              }
            : undefined
        }
        value={actualValue}
      ></input>
    );
  }
}

export default InputField;
