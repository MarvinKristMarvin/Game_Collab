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
import decodeSanitized from "../utils/decodeSanitized.ts";

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
          // Decode sanitized data
          response.data.forEach((user) => {
            user.name = decodeSanitized(user.name);
            user.description = decodeSanitized(user.description);
            if (user.portfolio_url) {
              user.portfolio_url = decodeSanitized(user.portfolio_url);
            }
          });
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
      <main className="searchPage" aria-label="filter profiles page">
        <FixedButtons
          filtering={filtering}
          getFilteredProfiles={getFilteredProfiles}
        />
        <form action="" aria-label="filters form">
          {/* Choose an age limit for the search string*/}
          <div className="spacingSection">
            <Label text="Search for minimum and maximum age" htmlFor="minAge" />
            <div
              className="nameAndAgeList"
              aria-label="minimum and maximum age filtering fields"
            >
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
          </div>

          {/* Add languages to the search string */}
          <div className="spacingSection">
            <Label text="Search people talking" htmlFor="english" />
            <div
              className="flagList"
              aria-label="languages filtering checkboxes"
            >
              {[
                "English.gb",
                "French.fr",
                "German.de",
                "Japanese.jp",
                "Russian.ru",
                "Spanish.es",
                "Portuguese.pt",
                "Turkish.tr",
                "Italian.it",
                "Persian.ir",
                // "Dutch.nl",
                // "Polish.pl",
                // "Chinese.cn",
                // "Vietnamese.vn",
                // "Indonesian.id",
                // "Czech.cz",
                // "Korean.kr",
                // "Ukrainian.ua",
                // "Arabic.sa",
                // "Greek.gr",
                // "Hebrew.il",
                // "Swedish.se",
                // "Romanian.ro",
                // "Hungarian.hu",
                // "Thai.th",
                // "Danish.dk",
                // "Slovak.sk",
                // "Finnish.fi",
                // "Norwegian.no",
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
          </div>

          {/* Add jobs to the search string */}
          <div className="spacingSection">
            <Label text="Search people doing" htmlFor="code" />
            <div className="jobList" aria-label="jobs filtering checkboxes">
              {[
                "Code",
                "Sprites",
                "Models",
                "Animations",
                "Sounds",
                "Musics",
                "Story",
                "Marketing",
              ].map((job) => (
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
          </div>

          {/* Add remunerations to the search string */}
          <div className="spacingSection">
            <Label text="Search people working for" htmlFor="free" />
            <div
              className="remunerationList"
              aria-label="remunerations filtering checkboxes"
            >
              {["Fun", "Shares", "Commissions", "Salary"].map(
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
          </div>

          {/* Add keywords to the search string (not implemented yet) */}
          <div className="spacingSection ">
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
          </div>
        </form>
      </main>
    );
  } else {
    return (
      // If filtering is false, show the "browse profiles" page
      <main className="searchPage" aria-label="browse profiles page">
        <FixedButtons
          filtering={filtering}
          updateFilteringToTrue={updateFilteringToTrue}
        />
        {/* Show profile info only if profiles are loaded */}
        {loadedProfiles.length > 0 ? (
          <section className="profileInformations">
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
                <article
                  className="profile"
                  key={index}
                  aria-label={"profile " + index}
                >
                  <section
                    className="basicInformations"
                    aria-label="profile basic informations"
                  >
                    <p className={"nameAge"}>
                      {decodeSanitized(profile.name) + ", "}
                      {profile.age}
                    </p>
                    <div className="languages" aria-label="profile languages">
                      {languages.map((language) => {
                        const [languageName, languageCode] =
                          language.split(".");
                        return (
                          <div className="language" key={languageCode}>
                            <img
                              src={`https://flagcdn.com/w40/${languageCode}.png`}
                              alt={languageName}
                              loading="lazy"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  <section className="jobs" aria-label="profile jobs">
                    {jobs.map((job, i) => (
                      <div className="job" key={i}>
                        {job}
                      </div>
                    ))}
                  </section>
                  <section
                    className="remunerations"
                    aria-label="profile remunerations"
                  >
                    {remunerations.map((remuneration, i) => (
                      <div className="remuneration" key={i}>
                        {remuneration}
                      </div>
                    ))}
                  </section>
                  <section
                    className="description"
                    aria-label="profile description"
                  >
                    <p>{decodeSanitized(profile.description)}</p>
                  </section>
                  <section className="portfolio" aria-label="profile portfolio">
                    {profile.portfolio_url ? (
                      <a
                        href={
                          profile.portfolio_url.startsWith("http")
                            ? decodeSanitized(profile.portfolio_url)
                            : `https://${decodeSanitized(
                                profile.portfolio_url
                              )}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {decodeSanitized(profile.description)}
                      </a>
                    ) : null}
                  </section>
                  <section className="mail" aria-label="profile mail">
                    <p>{profile.profile_mail}</p>
                  </section>
                </article>
              );
            })}
          </section>
        ) : (
          <p aria-label="no profiles found message">
            No profiles found with those filters, please try with other ones
          </p>
        )}
      </main>
    );
  }
}

export default Search;
