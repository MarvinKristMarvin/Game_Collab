import "./CheckableItem.css";

interface props {
  text: string;
  inputId: string;
  language?: string;
}

function CheckableItem({ text, inputId, language }: props) {
  return (
    <input
      type="checkbox"
      className={`checkbox checkableItemComponent ${language}`}
      data-name={text}
      id={inputId}
    />
  );
}

export default CheckableItem;
