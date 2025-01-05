import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import PositiveMessage from "../components/PositiveMessage/PositiveMessage";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLoggedUser } from "../context/userContext";
import removeLastCharacters from "../utils/removeLastCharacters";
import { useNavigate } from "react-router-dom";
import useInactivityHandler from "../hooks/useInactivityHandler";

function Profile() {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useLoggedUser();
  axios.defaults.withCredentials = true;

  // Get logOut function from the inactivity handler hook to be able to use logOut in the logout button
  const { logOut } = useInactivityHandler();

  // Login state
  const [loginData, setLoginData] = useState({
    mail: "",
    password: "",
  });

  // Login state update functions
  const updateLoginMail = (value: string) => {
    setLoginData((prevState) => ({
      ...prevState, // spread operator to keep other values intact
      mail: value,
    }));
  };
  const updateLoginPassword = (value: string) => {
    setLoginData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  // Login function on button "Log in", post login data, if success setLoggedUser
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { mail, password } = loginData;
    try {
      const { data } = await axios.post("http://localhost:5000/login", {
        mail,
        password,
      });
      // Destructured "data" comes from axios
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Log in successfull ! You can now modify your profile.");
        setLoginData({ mail: "", password: "" });
        setLoggedUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Signup state
  const [signupData, setSignupData] = useState({
    mail: "",
    password: "",
    confirmation: "",
  });

  // Signup state update functions
  const updateSignupMail = (value: string) => {
    setSignupData((prevState) => ({
      ...prevState,
      mail: value,
    }));
  };
  const updateSignupPassword = (value: string) => {
    setSignupData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };
  const updateSignupConfirmation = (value: string) => {
    setSignupData((prevState) => ({
      ...prevState,
      confirmation: value,
    }));
  };

  // Signup function on button "Sign up", post signup data then clears signup states
  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { mail, password, confirmation } = signupData;
    try {
      const { data } = await axios.post("http://localhost:5000/signup", {
        mail,
        password,
        confirmation,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Sign up successful, you can now log in !");
        // Clear signup input fields
        updateSignupMail("");
        updateSignupPassword("");
        updateSignupConfirmation("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Profile states
  const [age, setAge] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [portfolio_url, setPortfolio_url] = useState<string | null>(null);
  const [profile_mail, setProfile_mail] = useState<string | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRemunerations, setSelectedRemunerations] = useState<string[]>(
    []
  );

  // Profile state update functions
  const updateName = (value: string) => {
    setName(value);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, name: value });
    }
  };
  const updateDescription = (value: string) => {
    setDescription(value);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, description: value });
    }
  };
  const updatePortfolio_url = (value: string) => {
    setPortfolio_url(value);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, portfolio_url: value });
    }
  };
  const updateProfile_mail = (value: string) => {
    setProfile_mail(value);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, profile_mail: value });
    }
  };
  const updateAge = (value: string) => {
    if (value) setAge(Number(value));
    else setAge(null);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, age: Number(value) });
    }
  };

  // Update profile states with loggedUser context data when loggedUser changes
  useEffect(() => {
    if (loggedUser) {
      setAge(loggedUser.age || null);
      setName(loggedUser.name || null);
      setDescription(loggedUser.description || null);
      setPortfolio_url(loggedUser.portfolio_url || null);
      setProfile_mail(loggedUser.profile_mail || null);
      setSelectedJobs(loggedUser.jobs || []);
      setSelectedLanguages(loggedUser.languages || []);
      setSelectedRemunerations(loggedUser.remunerations || []);
    }
  }, [loggedUser]);

  // Add or remove a job, language or remuneration from the loggedUser context, using the selectedJobs, selectedLanguages and selectedRemunerations states
  const addOrRemoveFromDataList = (
    data: string, // Artist
    loggedUserFieldName: string, // "jobs"
    dataList: string[] // selectedJobs
  ) => {
    let updatedList;
    if (dataList.includes(data)) {
      // Data is already in the list, remove it
      updatedList = dataList.filter((item) => item !== data);
    } else {
      // Data is not in the list, add it
      updatedList = [...dataList, data];
    }
    // Update the loggedUser context with the updatedList
    if (loggedUser) {
      setLoggedUser({
        ...loggedUser,
        [loggedUserFieldName]: updatedList,
      });
    }
  };

  // On "Save" button, patch the userwith the loggedUser context data
  const saveUser = async () => {
    // Clean up the first null value of each array (because there is always one and I don't know why)
    const cleanSelectedJobs = selectedJobs.filter((job) => job != null);
    const cleanSelectedLanguages = selectedLanguages.filter(
      (language) => language != null
    );
    const cleanSelectedRemunerations = selectedRemunerations.filter(
      (remuneration) => remuneration != null
    );
    if (loggedUser) {
      try {
        const { data } = await axios.patch(
          `http://localhost:5000/api/user/${loggedUser.id}`,
          {
            age: age,
            name: name,
            description: description,
            portfolio_url: portfolio_url,
            profile_mail: profile_mail,
            jobs: cleanSelectedJobs,
            languages: cleanSelectedLanguages,
            remunerations: cleanSelectedRemunerations,
          }
        );
        if (data.error) {
          toast.error(data.error);
        } else {
          // If no error
          // The backend gives a different warning message for each problematic field, then send a toast for each
          if (data.warnings.length > 0) {
            data.warnings.forEach((warning: string) => {
              toast.error(warning);
            });
          } else {
            toast.success(
              "Your profile is complete and will be shown to others"
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // On "Delete my account" button, delete the user's account
  const deleteAccount = async () => {
    try {
      if (loggedUser) {
        const response = await axios.delete(
          `http://localhost:5000/api/user/${loggedUser.id}`,
          { withCredentials: true }
        );
        if (response.status === 204 || response.status === 200) {
          setLoggedUser(null);
          toast.success("Your account has been deleted successfully.");
          navigate("/profile");
        } else {
          toast.success(
            "We are unable to delete your account at the moment, please log out and try again."
          );
        }
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
    }
  };

  // If the user is not authentified, show the login and signup page, else show his profile page
  if (loggedUser === null) {
    return (
      <div className="profilePage">
        {/* Login and signup forms */}
        <form onSubmit={loginUser}>
          <Label text="Log in to modify your profile" htmlFor="login-email" />
          <InputField
            placeholder="Mail"
            inputType="email"
            inputId="login-email"
            inputName="login-email"
            isNumber={false}
            onChangeHandler={updateLoginMail}
            actualValue={loginData.mail}
          />
          <InputField
            placeholder="Password"
            inputType="password"
            inputId="login-password"
            inputName="login-password"
            isNumber={false}
            onChangeHandler={updateLoginPassword}
            actualValue={loginData.password}
          />
          <Button text="Log in" buttonType="submit" />
        </form>
        <form onSubmit={signupUser}>
          <Label
            text="Or sign up if you don't have an account yet !"
            htmlFor="signup-email"
          />
          <InputField
            placeholder="Mail"
            inputType="email"
            inputId="signup-email"
            inputName="signup-email"
            isNumber={false}
            onChangeHandler={updateSignupMail}
            actualValue={signupData.mail}
          />
          <InputField
            placeholder="Password  (Minimum 8 characters)"
            inputType="password"
            inputId="signup-password"
            inputName="signup-password"
            isNumber={false}
            onChangeHandler={updateSignupPassword}
            actualValue={signupData.password}
          />
          <InputField
            placeholder="Confirm password"
            inputType="password"
            inputId="confirm-password"
            inputName="confirm-password"
            isNumber={false}
            onChangeHandler={updateSignupConfirmation}
            actualValue={signupData.confirmation}
          />
          <Button text="Sign up" buttonType="submit" />
        </form>
      </div>
    );
  } else if (loggedUser !== null) {
    // If user is authenticated show his profile page
    return (
      <div className="profilePage">
        <PositiveMessage text='Hello, edit your profile then click on "save", an incomplete profile will not be shown on our platform' />
        <form action="">
          {/* Name and age fields */}
          <section className="spacingSection">
            <Label text="Enter your name and age" htmlFor="name" />
            <div className="nameAndAgeList">
              <InputField
                placeholder="Name"
                inputType="text"
                inputId="name"
                inputName="name"
                isNumber={false}
                onChangeHandler={updateName}
                actualValue={name != undefined ? name : ""}
              />
              <InputField
                placeholder="Age"
                inputType="text"
                inputId="age"
                inputName="age"
                isNumber={true}
                onChangeHandler={updateAge}
                actualValue={age != undefined ? age.toString() : ""}
              />
            </div>
          </section>

          {/* Languages checkboxes */}
          <section className="spacingSection">
            <Label text="Select your languages" htmlFor="english.gb" />
            <div className="flagList">
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
                "Dutch.nl",
                "Polish.pl",
                "Chinese.cn",
                "Vietnamese.vn",
                "Indonesian.id",
                "Czech.cz",
                "Korean.kr",
                "Ukrainian.ua",
                "Arabic.sa",
                "Greek.gr",
                "Hebrew.il",
                "Swedish.se",
                "Romanian.ro",
                "Hungarian.hu",
                "Thai.th",
                "Danish.dk",
                "Slovak.sk",
                "Finnish.fi",
                "Norwegian.no",
              ].map((language) => (
                <CheckableItem
                  key={language}
                  text={removeLastCharacters(language, 3)}
                  inputId={language.toLowerCase()}
                  onChange={() =>
                    addOrRemoveFromDataList(
                      language,
                      "languages",
                      selectedLanguages
                    )
                  }
                  checked={selectedLanguages.includes(language)}
                />
              ))}
            </div>
          </section>

          {/* Jobs checkboxes */}
          <section className="spacingSection">
            <Label text="What jobs can you do" htmlFor="artist" />
            <div className="jobList">
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
                    addOrRemoveFromDataList(job, "jobs", selectedJobs)
                  }
                  checked={selectedJobs.includes(job)}
                />
              ))}
            </div>
          </section>

          {/* Remunerations checkboxes */}
          <section className="spacingSection">
            <Label text="What are you working for" htmlFor="nothing" />
            <div className="remunerationList">
              {["Fun", "Shares", "Commissions", "Salary"].map(
                (remuneration) => (
                  <CheckableItem
                    key={remuneration}
                    text={remuneration}
                    inputId={remuneration.toLowerCase()}
                    onChange={() =>
                      addOrRemoveFromDataList(
                        remuneration,
                        "remunerations",
                        selectedRemunerations
                      )
                    }
                    checked={selectedRemunerations.includes(remuneration)}
                  />
                )
              )}
            </div>
          </section>

          {/* Description, portfolio and contact mail fields */}
          <section className="spacingSection">
            <Label text="Other informations" htmlFor="description" />
            <InputField
              placeholder="Describe yourself, your skills, experience etc..."
              inputType="textarea"
              inputId="description"
              inputName="description"
              isNumber={false}
              onChangeHandler={updateDescription}
              actualValue={description != undefined ? description : ""}
            />
            <InputField
              placeholder="Portfolio Link  (Not required)"
              inputType="text"
              inputId="portfolio"
              inputName="portfolio"
              isNumber={false}
              onChangeHandler={updatePortfolio_url}
              actualValue={portfolio_url != undefined ? portfolio_url : ""}
            />
            <InputField
              placeholder="Contact mail"
              inputType="text"
              inputId="mail"
              inputName="mail"
              isNumber={false}
              onChangeHandler={updateProfile_mail}
              actualValue={profile_mail != undefined ? profile_mail : ""}
            />
          </section>
          {/* Save, log out and delete my account buttons */}
          <Button text="Save" func={saveUser} />
          <Button text="Log out" func={logOut} color="orangeButton" />
          <Button
            text="Delete my account"
            func={deleteAccount}
            color="orangeButton"
          />
        </form>
      </div>
    );
  }
}
export default Profile;
