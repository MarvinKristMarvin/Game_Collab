import "./Button.css";
import { IButton } from "../../@types/components";

function Button({ text, func, color }: IButton) {
  return (
    <div className={`buttonComponent ${color}`} onClick={func}>
      <p>{text}</p>
    </div>
  );
}

export default Button;
