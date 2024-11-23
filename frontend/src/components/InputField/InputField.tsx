import "./InputField.css";

interface props {
  placeholder: string;
  inputType: string;
  inputId: string;
  inputName: string;
}

function InputField({ placeholder, inputType, inputId, inputName }: props) {
  if (inputType === "textarea") {
    return (
      <textarea
        id={inputId}
        name={inputName}
        placeholder={placeholder}
        className="inputFieldComponent"
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
