import "./CheckableItem.css";
import { ICheckableItem } from "../../@types/components";

// An item of a list of checkable items
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
      aria-label={text + " checkbox"}
    />
  );
}

export default CheckableItem;
