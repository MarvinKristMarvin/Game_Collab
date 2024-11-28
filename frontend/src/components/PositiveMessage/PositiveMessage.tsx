import { IPositiveMessage } from "../../@types/components";
import "./PositiveMessage.css";

function PositiveMessage({ text }: IPositiveMessage) {
  return (
    <div className="positiveMessageComponent">
      <p>{text}</p>
    </div>
  );
}

export default PositiveMessage;
