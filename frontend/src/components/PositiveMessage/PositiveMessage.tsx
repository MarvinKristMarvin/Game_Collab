import { IPositiveMessage } from "../../@types/components";
import "./PositiveMessage.css";

// Displays a text surrounded by a green hashed border
function PositiveMessage({ text }: IPositiveMessage) {
  return (
    <div className="positiveMessageComponent">
      <p>{text}</p>
    </div>
  );
}

export default PositiveMessage;
