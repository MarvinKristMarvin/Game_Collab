import "./PositiveMessage.css";

interface props {
  text: string;
}

function PositiveMessage({ text }: props) {
  return (
    <div className="positiveMessageComponent">
      <p>{text}</p>
    </div>
  );
}

export default PositiveMessage;
