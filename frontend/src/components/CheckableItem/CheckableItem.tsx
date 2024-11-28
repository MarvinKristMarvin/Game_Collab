import "./CheckableItem.css";
import { ICheckableItem } from "../../@types/components";

function CheckableItem({
  text,
  inputId,
  language,
  checked,
  onChange,
}: ICheckableItem) {
  return (
    <input
      type="checkbox"
      className={`checkbox checkableItemComponent ${language}`}
      data-name={text}
      id={inputId}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default CheckableItem;
