import "./FixedButtons.css";
import Button from "../Button/Button";

interface props {
  filtering: boolean;
  updateFilteringToTrue?: () => void;
  updateFilteringToFalse?: () => void;
  goToNextUser?: () => void;
}

function FixedButtons({
  filtering,
  updateFilteringToTrue,
  updateFilteringToFalse,
  goToNextUser,
}: props) {
  function leftProfile() {
    console.log("left profile");
  }

  if (filtering === true) {
    return (
      <div className="fixedButtonsComponent">
        <div className="buttonsContainer">
          <Button text="Search profiles" func={updateFilteringToFalse} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixedButtonsComponent grid">
        {/* ici les fixedButtons à importer */}
        <Button text="&#9664;" func={leftProfile} />
        <Button text="Filters" func={updateFilteringToTrue} />
        <Button text="&#9654;" func={goToNextUser} />
      </div>
    );
  }
}

export default FixedButtons;
