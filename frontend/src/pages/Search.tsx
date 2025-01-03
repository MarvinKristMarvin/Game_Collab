import FixedButtons from "../components/FixedButtons/FixedButtons";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import commaStringToArray from "../utils/commaStringToArray.ts";
import removeLastCharacters from "../utils/removeLastCharacters.ts";
import { toast } from "react-hot-toast";
import useInactivityHandler from "../hooks/useInactivityHandler.ts";
import { userInterface } from "../@types/components";

function Search() {
  axios.defaults.withCredentials = true;
  useInactivityHandler();

  // Toggle pages "browse profiles" and "filtering"
  const [filtering, setFiltering] = useState(false);
  const updateFilteringToTrue = () => {
    setFiltering(true);
  };
  const updateFilteringToFalse = () => {
    setFiltering(false);
  };

  // Loaded profiles to display of type userInterface
  const [loadedProfiles, setLoadedProfiles] = useState<userInterface[]>([]);

  // Filter parameters
  const [minimumAge, setMinimumAge] = useState<number>(0);
  const [maximumAge, setMaximumAge] = useState<number>(99);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRemunerations, setSelectedRemunerations] = useState<string[]>(
    []
  );

  // Create the filter string which will get modified on "search profiles" submit button
  const dataURL = "http://localhost:5000/";
  const [filterString, setFilterString] =
    useState<string>("api/users/filtered");

  // Load non filtered profiles on first render and setLoadedProfiles (filtered without parameters gets all profiles)
  useEffect(() => {
    axios
      .get<userInterface[]>("http://localhost:5000/api/users/filtered")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setLoadedProfiles(response.data);
        }
      })
      .catch((error) => {
        console.error("Error getting non filtered profiles:", error);
      });
  }, []);

  // On input check, toggle the value (like a job name with setSelectedJobs for example) in the selectedJobs array
  const toggleFilter = (
    value: string, // Artist
    setFilter: React.Dispatch<React.SetStateAction<string[]>>, // setSelectedJobs
    filters: string[] // selectedJobs
  ) => {
    if (filters.includes(value)) {
      setFilter(filters.filter((item) => item !== value));
    } else {
      setFilter([...filters, value]);
    }
  };

  // Functions to update filter age parameters
  const updateMinAge = (value: string) => {
    setMinimumAge(Number(value));
  };
  const updateMaxAge = (value: string) => {
    setMaximumAge(Number(value));
  };

  // Filtering keywords not working yet
  const [keywords, setKeywords] = useState<string | null>(null);
  const updateKeywords = (value: string) => {
    setKeywords(value);
  };

  // Write the filtering string then setFilterString
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

    setFilterString(`api/users/filtered?${queryParams.toString()}`);
  }, [
    selectedJobs,
    selectedLanguages,
    selectedRemunerations,
    minimumAge,
    maximumAge,
  ]);

  // When click on search profiles button => load filtered profiles and update page to browse profiles
  const getFilteredProfiles = () => {
    // Maximum age can't be less than minimum age
    if (maximumAge < minimumAge) {
      setMaximumAge(minimumAge);
    }
    axios
      .get<userInterface[]>(dataURL + filterString)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setLoadedProfiles(response.data);
          toast.success(
            response.data.length + " profiles matches your filters"
          );
        } else {
          setLoadedProfiles([]);
          toast.error("No profiles have been found with your filters");
        }
      })
      .catch((error) => {
        console.error("Error getting filtered profiles:", error);
      });

    // Updates the page to browse profiles (filtering = false)
    updateFilteringToFalse();
  };

  // If filtering is true => show filters page, else, browse profiles */
  if (filtering === true) {
    return (
      <div className="searchPage">
        <FixedButtons
          filtering={filtering}
          getFilteredProfiles={getFilteredProfiles}
        />
        <form action="">
          {/* Choose an age limit for the search string*/}
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

          {/* Add languages to the search string */}
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

          {/* Add jobs to the search string */}
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

          {/* Add remunerations to the search string */}
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

          {/* Add keywords to the search string (not implemented yet) */}
          <section className="spacingSection ">
            <Label text="Search for description keywords" htmlFor="keywords" />
            <InputField
              placeholder="Keywords separated by space"
              inputType="textarea"
              inputId="keywords"
              inputName="keywords"
              isNumber={false}
              actualValue={keywords != undefined ? keywords : ""}
              onChangeHandler={updateKeywords}
            />
          </section>
        </form>
      </div>
    );
  } else {
    return (
      // If filtering is false, show the "browse profiles" page
      <div className="searchPage">
        <FixedButtons
          filtering={filtering}
          updateFilteringToTrue={updateFilteringToTrue}
        />
        {/* Show profile info only if profiles are loaded */}
        {loadedProfiles.length > 0 ? (
          <div className="profileInformations">
            {loadedProfiles.map((profile, index) => {
              // Create arrays from strings for languages, jobs and remunerations for the current profile
              const languages = profile.languages
                ? commaStringToArray(profile.languages)
                : [];
              const jobs = profile.jobs ? commaStringToArray(profile.jobs) : [];
              const remunerations = profile.remunerations
                ? commaStringToArray(profile.remunerations)
                : [];

              // Create a card for each profile
              return (
                <div className="profile" key={index}>
                  <section className="basicInformations">
                    <p className={"nameAge"}>
                      {profile.name + ", "}
                      {profile.age}
                    </p>
                    <div className="languages">
                      {languages.map((language) => {
                        const [languageName, languageCode] =
                          language.split(".");
                        return (
                          <div className="language" key={languageCode}>
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
                    {jobs.map((job, i) => (
                      <div className="job" key={i}>
                        {job}
                      </div>
                    ))}
                  </section>
                  <section className="remunerations">
                    {remunerations.map((remuneration, i) => (
                      <div className="remuneration" key={i}>
                        {remuneration}
                      </div>
                    ))}
                  </section>
                  <section className="description">
                    <p>{profile.description}</p>
                  </section>
                  <section className="portfolio">
                    {profile.portfolio_url ? (
                      <a
                        href={
                          profile.portfolio_url.startsWith("http")
                            ? profile.portfolio_url
                            : `https://${profile.portfolio_url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {profile.portfolio_url}
                      </a>
                    ) : null}
                  </section>
                  <section className="mail">
                    <p>{profile.profile_mail}</p>
                  </section>
                </div>
              );
            })}
          </div>
        ) : (
          <p>
            No profiles found with those filters, please try with other ones
          </p>
        )}
      </div>
    );
  }
}

export default Search;
