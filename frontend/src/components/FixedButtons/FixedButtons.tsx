import "./FixedButtons.css";
import Button from "../Button/Button";
import { IFixedButtons } from "../../@types/components";

function FixedButtons({
  filtering,
  updateFilteringToTrue,
  getFilteredProfiles,
}: IFixedButtons) {
  if (filtering === true) {
    return (
      <div className="fixedButtonsComponent">
        <div className="buttonsContainer">
          <Button text="Search profiles" func={getFilteredProfiles} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixedButtonsComponent">
        <div className="buttonsContainer">
          <Button text="Filters" func={updateFilteringToTrue} />
        </div>
      </div>
    );
  }
}

export default FixedButtons;
