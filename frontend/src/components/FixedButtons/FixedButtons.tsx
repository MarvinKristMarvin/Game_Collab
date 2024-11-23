import "./FixedButtons.css";
import Button from "../Button/Button";

function FixedButtons() {
  function searchProfiles() {
    console.log("search profiles function");
  }
  return (
    <div className="fixedButtonsComponent">
      {/* ici les fixedButtons à importer */}
      <Button text="Search profiles" func={searchProfiles} />
    </div>
  );
}

export default FixedButtons;
