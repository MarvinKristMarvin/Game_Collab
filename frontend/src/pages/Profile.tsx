import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import PositiveMessage from "../components/PositiveMessage/PositiveMessage";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLoggedUser } from "../context/userContext";
import removeLastCharacters from "../utils/removeLastCharacters";
import { useNavigate } from "react-router-dom";
import { useInactivityTimer } from "../hooks/useInactivityTimer";

function Profile() {
  const [connected, setConnected] = useState(false);
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // Inactivity handler
  const handleTimeOut = useCallback(() => {
    // The back already knows that the user is inactive after 10 minutes,
    // Need to remove all user informations from the front and toast the user
    if (connected) {
      toast.error("You will be logged out due to inactivity");
      logOut();
    }
  }, [setLoggedUser, connected]);

  // Start the inactivity timer
  useInactivityTimer(30 * 60 * 1000, handleTimeOut); // 30 minutes timeout

  // LOGIN LOGIC
  const [loginData, setLoginData] = useState({
    mail: "",
    password: "",
  });
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
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { mail, password } = loginData;
    try {
      const { data } = await axios.post("http://localhost:5000/login", {
        // data is from axios
        mail,
        password,
      });
      // if error from controller register informations validation, popup message
      if (data.error) {
        toast.error(data.error);
        console.log("data error : " + data.error);
      } else {
        toast.success("Log in successfull ! You can now modify your profile.");
        console.log("log in success !");
        console.log("login data : ", data);
        setLoginData({ mail: "", password: "" });
        // I should also join jobs, languages and remunerations there to preselect front choices
        //navigate("/login");
        // enter logged user data in the user context

        setLoggedUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // SIGNIN LOGIC
  const [signupData, setSignupData] = useState({
    mail: "",
    password: "",
    confirmation: "",
  });
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
  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { mail, password, confirmation } = signupData;
    try {
      const { data } = await axios.post("http://localhost:5000/signup", {
        // data is from axios
        mail,
        password,
        confirmation,
      });
      // if error from controller register informations validation, popup message
      if (data.error) {
        toast.error(data.error);
        console.log("dataerror : " + data.error);
      } else {
        toast.success("Sign up successful, you can now log in !");
        console.log("sign up success !");
        // Clear signup input fields
        updateSignupMail("");
        updateSignupPassword("");
        updateSignupConfirmation("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FORM MODIFICATION
  const [age, setAge] = useState<number | null>(null);
  const updateAge = (value: string) => {
    if (value) setAge(Number(value));
    else setAge(null);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, age: Number(value) });
    }
  };
  const [name, setName] = useState<string | null>(null);
  const updateName = (value: string) => {
    setName(value);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, name: value });
    }
  };
  const [description, setDescription] = useState<string | null>(null);
  const updateDescription = (value: string) => {
    setDescription(value);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, description: value });
    }
  };
  const [portfolio_url, setPortfolio_url] = useState<string | null>(null);
  const updatePortfolio_url = (value: string) => {
    setPortfolio_url(value);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, portfolio_url: value });
    }
  };
  const [profile_mail, setProfile_mail] = useState<string | null>(null);
  const updateProfile_mail = (value: string) => {
    setProfile_mail(value);
    if (loggedUser) {
      setLoggedUser({ ...loggedUser, profile_mail: value });
    }
  };

  useEffect(() => {
    if (loggedUser) {
      setConnected(true);
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

  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRemunerations, setSelectedRemunerations] = useState<string[]>(
    []
  );

  // Add or remove a job, language or remuneration in the logged user context
  const addOrRemoveFromDataList = (
    data: string,
    dataFamily: string,
    setDataList: React.Dispatch<React.SetStateAction<string[]>>,
    dataList: string[]
  ) => {
    // Check if the data is already in the list
    const dataIsPresent = dataList.includes(data);
    const updatedList = dataIsPresent
      ? dataList.filter((item) => item !== data) // Remove data
      : [...dataList, data]; // Add data

    // Update the loggedUser context
    if (loggedUser) {
      setLoggedUser({
        ...loggedUser,
        [dataFamily]: updatedList,
      });
    }
    console.log(dataIsPresent ? `Removed ${data}` : `Added ${data}`);
  };

  const saveUser = async () => {
    // Clean up the first null value of each array (couldn't find another way)
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
        // if error from controller register informations validation, popup message
        if (data.error) {
          toast.error(data.error);
          console.log("Profile update failed : " + data.error);
        } else {
          // warns for
          if (data.warnings.length > 0) {
            data.warnings.forEach((warning: string) => {
              toast.error(warning); // Example toast function
            });
          } else {
            toast.success(
              "Your profile is complete and will be shown to others"
            );
          }
          console.log("Save profile succeed");
          // update the loggedUser context with the saved data
          setLoggedUser({
            ...loggedUser,
            jobs: selectedJobs,
            languages: selectedLanguages,
            remunerations: selectedRemunerations,
          });
          //navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logOut = async () => {
    console.log("log out");
    setLoggedUser(null);
    setConnected(false);
    toast.success("You have been logged out successfully.");
    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        {} // Ensures cookies are sent with the request
      );
      if (response.status === 200) {
        console.log("Logged out successfully.");
      } else {
        console.error("Failed to log out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const deleteAccount = async () => {
    try {
      if (loggedUser) {
        const response = await axios.delete(
          `http://localhost:5000/api/user/${loggedUser.id}`,
          { withCredentials: true }
        );
        console.log("response ", response);
        if (response.status === 204 || response.status === 200) {
          console.log("Deleted account successfully.");
          setLoggedUser(null);
          setConnected(false);
          navigate("/profile");
          toast.success("Your account has been deleted successfully.");
        } else {
          console.error("Failed to delete account.");
        }
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
    }
  };

  /* if user is not authentified, show login signup page, else show his profile page */
  if (connected === false) {
    return (
      <div className="profilePage">
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
    // If user is authenticated show the profile page
    return (
      <div className="profilePage">
        <PositiveMessage text="Hello, edit your profile then save, an incomplete profile will not be shown on our platform" />
        <form action="">
          {/* NAME AND AGE */}
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

          {/* LANGUAGES */}
          <section className="spacingSection">
            <Label text="Select your languages" htmlFor="english.gb" />
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
                    addOrRemoveFromDataList(
                      language,
                      "languages",
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
            <Label text="What jobs can you do" htmlFor="artist" />
            <div className="jobList">
              {["Artist", "Sounds", "Dev"].map((job) => (
                <CheckableItem
                  key={job}
                  text={job}
                  inputId={job.toLowerCase()}
                  onChange={() =>
                    addOrRemoveFromDataList(
                      job,
                      "jobs",
                      setSelectedJobs,
                      selectedJobs
                    )
                  }
                  checked={selectedJobs.includes(job)}
                />
              ))}
            </div>
          </section>

          {/* REMUNERATION */}
          <section className="spacingSection">
            <Label text="What are you working for" htmlFor="nothing" />
            <div className="remunerationList">
              {["Nothing", "Shares", "Freelance", "Salary"].map(
                (remuneration) => (
                  <CheckableItem
                    key={remuneration}
                    text={remuneration}
                    inputId={remuneration.toLowerCase()}
                    onChange={() =>
                      addOrRemoveFromDataList(
                        remuneration,
                        "remunerations",
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

          {/* OTHER INFORMATIONS */}
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
          <Button text="Save" func={saveUser} />
          <Button text="Log out" func={logOut} color="orangeButton" />
          <Button
            text="Delete account"
            func={deleteAccount}
            color="orangeButton"
          />
        </form>
      </div>
    );
  }
}
export default Profile;
