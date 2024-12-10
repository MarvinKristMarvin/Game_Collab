import "./Button.css";
import { IButton } from "../../@types/components";

function Button({ text, func, color, buttonType = "button" }: IButton) {
  return (
    <button
      className={`buttonComponent ${color}`}
      onClick={func}
      type={buttonType}
    >
      <p>{text}</p>
    </button>
  );
}

export default Button;
