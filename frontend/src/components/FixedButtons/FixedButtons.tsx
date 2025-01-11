import "./FixedButtons.css";
import Button from "../Button/Button";
import { IFixedButtons } from "../../@types/components";

// A button which is fixed at the top of the page, below the header (for filtering and searching profiles)
function FixedButtons({
  filtering,
  updateFilteringToTrue,
  getFilteredProfiles,
}: IFixedButtons) {
  if (filtering === true) {
    return (
      <div className="fixedButtonsComponent">
        <div className="buttonsContainer">
          <Button
            text="Search profiles with these filters"
            func={getFilteredProfiles}
          />
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
