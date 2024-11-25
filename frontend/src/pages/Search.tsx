import FixedButtons from "../components/FixedButtons/FixedButtons";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import PositiveMessage from "../components/PositiveMessage/PositiveMessage";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import { useState } from "react";
import jsonUsers from "../dummydata/users.json";

function Search() {
  const [filtering, setFiltering] = useState(false);
  const updateFilteringToTrue = () => {
    setFiltering(true);
  };
  const updateFilteringToFalse = () => {
    setFiltering(false);
  };
  const [userId, setUserId] = useState(0);
  const goToNextUser = () => {
    /* get the next user in the user array */
    /* pourquoi ca fonctionne wtf (coup de chance car userId = 0 et Alice id = 1, ducoup userId devient 1 et Bob 2) ???? */
    console.log("userId " + userId);
    const nextUser = jsonUsers[userId];
    console.log("nextUser " + nextUser);
    setUserId(nextUser.id);
    console.log("nextUser.id " + nextUser.id);
    console.log("next user please");
  };

  /* if filtering show filters, else show profiles */
  if (filtering === true) {
    return (
      <div className="searchPage">
        <FixedButtons
          filtering={filtering}
          updateFilteringToFalse={updateFilteringToFalse}
        />
        <form action="">
          {/* NAME AND AGE */}
          <section className="spacingSection">
            <Label text="Search for minimum and maximum age" htmlFor="minAge" />
            <div className="nameAndAgeList">
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
  } else {
    return (
      /* OTHER FOUND PROFILE */
      <div className="searchPage">
        <FixedButtons
          filtering={filtering}
          updateFilteringToTrue={updateFilteringToTrue}
          goToNextUser={goToNextUser}
        />
        <div className="profileInformations">
          <section className="basicInformations">
            <p className={"nameAge"}>
              {jsonUsers[userId].name}, {jsonUsers[userId].age}
            </p>
            <div className="languages">
              {jsonUsers[userId].languages.map((language) => {
                const [languageName, languageCode] = language.name.split(".");
                return (
                  <div className="language">
                    <img
                      src={`https://flagcdn.com/w40/${languageCode}.png`}
                      width="40"
                      alt={languageName}
                    />
                  </div>
                );
              })}
            </div>
          </section>
          <section className="jobs">
            {jsonUsers[userId].jobs.map((job) => (
              <div className="job">{job.name}</div>
            ))}
          </section>
          <section className="remunerations">
            {jsonUsers[userId].remunerations.map((remuneration) => (
              <div className="remuneration">{remuneration.type}</div>
            ))}
          </section>
          <section className="description">
            <p>{jsonUsers[userId].description}</p>
          </section>
          <section className="portfolio">
            {jsonUsers[userId].portfolio_url ? (
              <a
                href={
                  /* ajouter http si pas présent dans l'url */
                  jsonUsers[userId].portfolio_url.startsWith("http")
                    ? jsonUsers[userId].portfolio_url
                    : `https://${jsonUsers[userId].portfolio_url}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {jsonUsers[userId].portfolio_url}
              </a>
            ) : (
              <span>No portfolio available</span>
            )}
            <span> &#x2197;</span>
          </section>
          <section className="mail">
            <p>{jsonUsers[userId].profile_mail}</p>
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
