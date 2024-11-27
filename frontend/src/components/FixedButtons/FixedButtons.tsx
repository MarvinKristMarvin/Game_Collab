import "./FixedButtons.css";
import Button from "../Button/Button";

interface props {
  filtering: boolean;
  updateFilteringToTrue?: () => void;
  goToNextUser?: () => void;
  goToPreviousUser?: () => void;
  getFilteredProfiles?: () => void;
}

function FixedButtons({
  filtering,
  updateFilteringToTrue,
  goToNextUser,
  goToPreviousUser,
  getFilteredProfiles,
}: props) {
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
      <div className="fixedButtonsComponent grid">
        <Button text="&#9664;" func={goToPreviousUser} />
        <Button text="Filters" func={updateFilteringToTrue} />
        <Button text="&#9654;" func={goToNextUser} />
      </div>
    );
  }
}

export default FixedButtons;
