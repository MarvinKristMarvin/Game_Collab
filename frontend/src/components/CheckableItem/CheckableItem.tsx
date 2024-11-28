import "./CheckableItem.css";
import { ICheckableItem } from "../../@types/components";

function CheckableItem({ text, inputId, language }: ICheckableItem) {
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
