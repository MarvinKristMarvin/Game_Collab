import FixedButtons from "../components/FixedButtons/FixedButtons";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import PositiveMessage from "../components/PositiveMessage/PositiveMessage";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import { useState } from "react";

function Search() {
  return (
    <div className="searchPage">
      <FixedButtons />
      <form action="">
        {/* NAME AND AGE */}
        <section className="spacingSection">
          <Label text="Search for minimum and maximum age" htmlFor="minAge" />
          <div className="jobList">
            <InputField
              placeholder="Minimum age"
              inputType="text"
              inputId="minAge"
              inputName="minAge"
            />
            <InputField
              placeholder="Maximum age"
              inputType="text"
              inputId="maxAge"
              inputName="maxAge"
            />
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="spacingSection">
          <Label text="Search people talking" htmlFor="english" />
          <div className="flagList">
            <CheckableItem text="" inputId="english" language="english" />
            <CheckableItem text="" inputId="french" language="french" />
            <CheckableItem text="" inputId="german" language="german" />
            <CheckableItem text="" inputId="japanese" language="japanese" />
            <CheckableItem text="" inputId="russian" language="russian" />
            <CheckableItem text="" inputId="english" language="english" />
            <CheckableItem text="" inputId="french" language="french" />
            <CheckableItem text="" inputId="german" language="german" />
            <CheckableItem text="" inputId="japanese" language="japanese" />
            <CheckableItem text="" inputId="russian" language="russian" />
          </div>
        </section>

        {/* JOBS */}
        <section className="spacingSection">
          <Label text="Search people doing" htmlFor="code" />
          <div className="jobList">
            <CheckableItem text="Code" inputId="code" />
            <CheckableItem text="Art" inputId="art" />
            <CheckableItem text="Modelling" inputId="modelling" />
            <CheckableItem text="Animation" inputId="animation" />
            <CheckableItem text="Music" inputId="music" />
            <CheckableItem text="Composition" inputId="composition" />
            <CheckableItem text="Sound" inputId="sound" />
            <CheckableItem text="Test" inputId="test" />
            <CheckableItem text="Other" inputId="other" />
          </div>
        </section>

        {/* REMUNERATION */}
        <section className="spacingSection">
          <Label text="Search people working for" htmlFor="free" />
          <div className="remunerationList">
            <CheckableItem text="Fun" inputId="free" />
            <CheckableItem text="Revenue shares" inputId="shares" />
            <CheckableItem text="Fixed amount" inputId="gratification" />
            <CheckableItem text="Salary" inputId="salary" />
          </div>
        </section>

        {/* KEYWORDS */}
        <section className="spacingSection ">
          <Label text="Search for description keywords" htmlFor="keywords" />
          <InputField
            placeholder="Keywords separated by space"
            inputType="textarea"
            inputId="keywords"
            inputName="keywords"
          />
        </section>
        {/*
        <Button text="Save" func={save} />
        <Button text="Log out" func={logOut} color="orangeButton" />
        <Button
          text="Delete account"
          func={deleteAccount}
          color="orangeButton"
        />*/}
      </form>
    </div>
  );
}

export default Search;
