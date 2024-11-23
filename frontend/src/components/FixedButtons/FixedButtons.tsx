import "./FixedButtons.css";
import Button from "../Button/Button";

interface props {
  filtering: boolean;
}

function FixedButtons({ filtering }: props) {
  function searchProfiles() {
    console.log("search profiles function");
  }
  function openFilters() {
    console.log("open filters menu");
  }
  function leftProfile() {
    console.log("left profile");
  }
  function rightProfile() {
    console.log("right profile");
  }

  if (filtering === true) {
    return (
      <div className="fixedButtonsComponent">
        {/* ici les fixedButtons à importer */}
        <Button text="Search profiles" func={searchProfiles} />
      </div>
    );
  } else {
    return (
      <div className="fixedButtonsComponent grid">
        {/* ici les fixedButtons à importer */}
        <Button text="<" func={leftProfile} />
        <Button text="Filters" func={openFilters} />
        <Button text=">" func={rightProfile} />
      </div>
    );
  }
}

export default FixedButtons;
