import FixedButtons from "../components/FixedButtons/FixedButtons";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import commaStringToArray from "../utils/commaStringToArray.ts";
import removeLastCharacters from "../utils/removeLastCharacters.ts";

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
  /* toggle "browse profiles" and "filtering" pages */
  const [filtering, setFiltering] = useState(false);
  const updateFilteringToTrue = () => {
    setFiltering(true);
  };
  const updateFilteringToFalse = () => {
    setFiltering(false);
  };

  /* create an index to go to next or previous loaded profile */
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

  /* create the filter string which will get modified on "search profiles" button submit */
  const dataURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const [loadedProfiles, setLoadedProfiles] = useState<userInterface[]>([]);

  /* load profiles on first render */
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
  /* convert strings separated by commas from the loaded profiles into array of strings */
  const languages = loadedProfiles[showProfileNumber]?.languages
    ? commaStringToArray(loadedProfiles[showProfileNumber].languages)
    : [];
  const jobs = loadedProfiles[showProfileNumber]?.jobs
    ? commaStringToArray(loadedProfiles[showProfileNumber].jobs)
    : [];
  const remunerations = loadedProfiles[showProfileNumber]?.remunerations
    ? commaStringToArray(loadedProfiles[showProfileNumber].remunerations)
    : [];

  const [minimumAge, setMinimumAge] = useState<number>(0);
  const [maximumAge, setMaximumAge] = useState<number>(99);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRemunerations, setSelectedRemunerations] = useState<string[]>(
    []
  );

  const [filterString, setFilterString] =
    useState<string>("api/users/filtered");

  const toggleFilter = (
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string[]>>,
    filters: string[]
  ) => {
    if (filters.includes(filter)) {
      setFilter(filters.filter((item) => item !== filter));
    } else {
      setFilter([...filters, filter]);
    }
  };

  const updateMinAge = (value: string) => {
    setMinimumAge(Number(value)); // Convert to number if valid
  };

  const updateMaxAge = (value: string) => {
    setMaximumAge(Number(value)); // Convert to number if valid
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (selectedJobs.length > 0)
      queryParams.append("jobs", selectedJobs.join(","));
    if (selectedLanguages.length > 0)
      queryParams.append("languages", selectedLanguages.join(","));
    if (selectedRemunerations.length > 0)
      queryParams.append("remunerations", selectedRemunerations.join(","));

    queryParams.append("minAge", minimumAge.toString());
    queryParams.append("maxAge", maximumAge.toString());
    console.log("maxAge : " + maximumAge);
    console.log("minAge : " + minimumAge);

    setFilterString(`api/users/filtered?${queryParams.toString()}`);
  }, [
    selectedJobs,
    selectedLanguages,
    selectedRemunerations,
    minimumAge,
    maximumAge,
  ]);

  /* when click on search profiles button => load filtered profiles and change page to browse profiles */
  /* http://localhost:5000/api/users/filtered?jobs=Artist,Dev&languages=English.gb,French.fr&remunerations=Freelance,Salary&minAge=25&maxAge=28 */
  const getFilteredProfiles = () => {
    /*if (minimumAge > maximumAge) {
      setMinimumAge(0);
    }*/
    if (maximumAge < minimumAge) {
      setMaximumAge(minimumAge);
    }
    setShowProfileNumber(0);
    console.log("request : " + dataURL + filterString);
    axios
      .get<userInterface[]>(dataURL + filterString)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setLoadedProfiles(response.data);
        } else {
          setLoadedProfiles([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    updateFilteringToFalse();
  };

  /* if filtering is true => show filters, else browse profiles */
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
                isNumber={true}
                onChangeHandler={updateMinAge}
                actualValue={minimumAge.toString()}
              />
              <InputField
                placeholder="Maximum age"
                inputType="text"
                inputId="maxAge"
                inputName="maxAge"
                isNumber={true}
                onChangeHandler={updateMaxAge}
                actualValue={maximumAge.toString()}
              />
            </div>
          </section>

          {/* LANGUAGES */}
          <section className="spacingSection">
            <Label text="Search people talking" htmlFor="english" />
            <div className="flagList">
              {[
                "English.gb",
                "French.fr",
                "German.de",
                "Japanese.jp",
                "Russian.ru",
              ].map((language) => (
                <CheckableItem
                  key={language}
                  text={removeLastCharacters(language, 3)}
                  inputId={language.toLowerCase()}
                  onChange={() =>
                    toggleFilter(
                      language,
                      setSelectedLanguages,
                      selectedLanguages
                    )
                  }
                  checked={selectedLanguages.includes(language)}
                />
              ))}
            </div>
          </section>

          {/* JOBS */}
          <section className="spacingSection">
            <Label text="Search people doing" htmlFor="code" />
            <div className="jobList">
              {["Artist", "Sounds", "Dev"].map((job) => (
                <CheckableItem
                  key={job}
                  text={job}
                  inputId={job.toLowerCase()}
                  onChange={() =>
                    toggleFilter(job, setSelectedJobs, selectedJobs)
                  }
                  checked={selectedJobs.includes(job)}
                />
              ))}
            </div>
          </section>

          {/* REMUNERATION */}
          <section className="spacingSection">
            <Label text="Search people working for" htmlFor="free" />
            <div className="remunerationList">
              {["Nothing", "Shares", "Freelance", "Salary"].map(
                (remuneration) => (
                  <CheckableItem
                    key={remuneration}
                    text={remuneration}
                    inputId={remuneration.toLowerCase()}
                    onChange={() =>
                      toggleFilter(
                        remuneration,
                        setSelectedRemunerations,
                        selectedRemunerations
                      )
                    }
                    checked={selectedRemunerations.includes(remuneration)}
                  />
                )
              )}
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
        </form>
      </div>
    );
  } else {
    return (
      /* BROWSE PROFILES */
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
                {loadedProfiles[showProfileNumber].name + ", "}
                {loadedProfiles[showProfileNumber].age}
              </p>
              <div className="languages">
                {languages.map((language) => {
                  console.log(languages);
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
                    /* add http if not already in the url */
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
          <p>No profiles found with those filters</p>
        )}
      </div>
    );
  }
}

export default Search;
