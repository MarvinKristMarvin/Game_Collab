import "./Button.css";

interface props {
  text: string;
  func: () => void;
  color?: string;
}

function Button({ text, func, color }: props) {
  return (
    <div className={`buttonComponent ${color}`} onClick={func}>
      <p>{text}</p>
    </div>
  );
}

export default Button;
