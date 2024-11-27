import FixedButtons from "../components/FixedButtons/FixedButtons";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface userInterface {
  id: number;
  password: string;
  mail: string;
  name: string;
  age: number;
  available: boolean;
  description: string;
  portfolio_url?: string;
  profile_mail: string;
  created_at: string;
  updated_at?: string;
  role: number;
  jobs: string;
  languages: string;
  remunerations: string;
}

function Search() {
  /* utils */
  const stringToArray = (str: string): string[] => {
    return str.split(",").map((item) => item.trim());
  };

  const [filtering, setFiltering] = useState(false);

  const updateFilteringToTrue = () => {
    setFiltering(true);
  };
  const updateFilteringToFalse = () => {
    setFiltering(false);
  };

  const [showProfileNumber, setShowProfileNumber] = useState(0);

  const goToNextUser = () => {
    if (showProfileNumber < loadedProfiles.length - 1) {
      setShowProfileNumber(showProfileNumber + 1);
    }
  };

  const goToPreviousUser = () => {
    if (showProfileNumber > 0) {
      setShowProfileNumber(showProfileNumber - 1);
    }
  };

  const dataURL = "http://localhost:5000/";
  const filterString =
    "api/users/filtered?jobs=Artist,Dev&remunerations=Salary";
  /* when click on search profiles button => load filtered profiles and change page to browse profiles */
  const getFilteredProfiles = () => {
    axios
      .get<userInterface[]>(
        /* http://localhost:5000/api/users/filtered?jobs=Artist,Dev&languages=English.gb,French.fr&remunerations=Freelance,Salary */
        dataURL + filterString
      )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setLoadedProfiles(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    updateFilteringToFalse();
  };

  const [loadedProfiles, setLoadedProfiles] = useState<userInterface[]>([]);

  useEffect(() => {
    axios
      .get<userInterface[]>(
        /* http://localhost:5000/api/users/filtered?jobs=Artist,Dev&languages=English.gb,French.fr&remunerations=Freelance,Salary */
        "http://localhost:5000/api/users/filtered?jobs=Artist,Dev&remunerations=Salary,Freelance"
      )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setLoadedProfiles(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(loadedProfiles);
  const languages = loadedProfiles[showProfileNumber]?.languages
    ? stringToArray(loadedProfiles[showProfileNumber].languages)
    : [];
  const jobs = loadedProfiles[showProfileNumber]?.jobs
    ? stringToArray(loadedProfiles[showProfileNumber].jobs)
    : [];
  const remunerations = loadedProfiles[showProfileNumber]?.remunerations
    ? stringToArray(loadedProfiles[showProfileNumber].remunerations)
    : [];

  /* if filtering show filters, else show profiles */
  if (filtering === true) {
    return (
      <div className="searchPage">
        <FixedButtons
          filtering={filtering}
          getFilteredProfiles={getFilteredProfiles}
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
          goToPreviousUser={goToPreviousUser}
        />
        {/* show profile info only if profiles are loaded */}
        {loadedProfiles.length > 0 ? (
          <div className="profileInformations">
            <section className="basicInformations">
              <p className={"nameAge"}>
                {loadedProfiles[showProfileNumber].name},{" "}
                {loadedProfiles[showProfileNumber].age}
              </p>
              <div className="languages">
                {languages.map((language) => {
                  const [languageName, languageCode] = language.split(".");
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
              {jobs.map((job) => (
                <div className="job">{job}</div>
              ))}
            </section>
            <section className="remunerations">
              {remunerations.map((remuneration) => (
                <div className="remuneration">{remuneration}</div>
              ))}
            </section>
            <section className="description">
              <p>{loadedProfiles[showProfileNumber].description}</p>
            </section>
            <section className="portfolio">
              {loadedProfiles[showProfileNumber].portfolio_url ? (
                <a
                  href={
                    /* ajouter http si pas présent dans l'url */
                    loadedProfiles[showProfileNumber].portfolio_url.startsWith(
                      "http"
                    )
                      ? loadedProfiles[showProfileNumber].portfolio_url
                      : `https://${loadedProfiles[showProfileNumber].portfolio_url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {loadedProfiles[showProfileNumber].portfolio_url}
                </a>
              ) : (
                <span>No portfolio available</span>
              )}
              <span> &#x2197;</span>
            </section>
            <section className="mail">
              <p>{loadedProfiles[showProfileNumber].profile_mail}</p>
            </section>
          </div>
        ) : (
          <p>loading</p>
        )}
      </div>
    );
  }
}

export default Search;
