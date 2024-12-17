import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import PositiveMessage from "../components/PositiveMessage/PositiveMessage";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLoggedUser } from "../context/userContext";

function Profile() {
  const [connected, setConnected] = useState(false);
  const { loggedUser, setLoggedUser } = useLoggedUser();

  useEffect(() => {
    if (loggedUser) {
      setConnected(true);
      // write loggedUser data in the form at page start
      if (loggedUser.age != null) {
        updateAge(loggedUser.age.toString());
      }
      if (loggedUser.name != null) {
        updateName(loggedUser.name);
      }
      if (loggedUser.description != null) {
        updateDescription(loggedUser.description);
      }
      if (loggedUser.portfolio_url != null) {
        updatePortfolio_url(loggedUser.portfolio_url);
      }
      if (loggedUser.profile_mail != null) {
        updateProfile_mail(loggedUser.profile_mail);
      }
      if (loggedUser.jobs != null) {
        setSelectedJobs(loggedUser.jobs);
      }
    }
  }, [loggedUser]);

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
        toast.success("Sign up successful, welcome to Game Hearts !");
        console.log("sign up success !");
        //navigate("/login");
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
  };
  const [name, setName] = useState<string | null>(null);
  const updateName = (value: string) => {
    setName(value);
  };
  const [description, setDescription] = useState<string | null>(null);
  const updateDescription = (value: string) => {
    setDescription(value);
  };
  const [portfolio_url, setPortfolio_url] = useState<string | null>(null);
  const updatePortfolio_url = (value: string) => {
    setPortfolio_url(value);
  };
  const [profile_mail, setProfile_mail] = useState<string | null>(null);
  const updateProfile_mail = (value: string) => {
    setProfile_mail(value);
  };

  const [jobs, setJobs] = useState<string[]>([]);
  const updateJobs = (value: string[]) => {
    setJobs(value);
  };

  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRemunerations, setSelectedRemunerations] = useState<string[]>(
    []
  );
  const addOrRemoveFromDataList = (
    data: string,
    setDataList: React.Dispatch<React.SetStateAction<string[]>>,
    dataList: string[]
  ) => {
    if (dataList.includes(data)) {
      setDataList(dataList.filter((item) => item !== data));
    } else {
      setDataList([...dataList, data]);
    }
  };
  const saveUser = async () => {
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
            jobs: selectedJobs,
          }
        );
        // if error from controller register informations validation, popup message
        if (data.error) {
          toast.error(data.error);
          console.log("Profile update failed : " + data.error);
        } else {
          toast.success("Your changes have been saved !");
          console.log("Save profile succeed");
          // update the loggedUser context with the saved data
          setLoggedUser({ ...loggedUser, jobs: selectedJobs });
          //navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logOut = () => {
    console.log("log out");
  };
  const deleteAccount = () => {
    console.log("delete account modal");
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
            placeholder="Password"
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
        <PositiveMessage text="You are successfully logged in, you can edit your profile and share it to others" />
        <p>{loggedUser.mail}</p>
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
            <Label text="Select your working languages" htmlFor="english" />
            <div className="flagList">
              <CheckableItem text="english" inputId="english" />
              <CheckableItem text="french" inputId="french" />
              <CheckableItem text="german" inputId="german" />
              <CheckableItem text="japanese" inputId="japanese" />
              <CheckableItem text="russian" inputId="russian" />
            </div>
          </section>

          {/* JOBS */}
          <section className="spacingSection">
            <p>{selectedJobs}</p>
            <Label text="Search people doing" htmlFor="code" />
            <div className="jobList">
              {["Artist", "Sounds", "Dev"].map((job) => (
                <CheckableItem
                  key={job}
                  text={job}
                  inputId={job.toLowerCase()}
                  onChange={() =>
                    addOrRemoveFromDataList(job, setSelectedJobs, selectedJobs)
                  }
                  checked={selectedJobs.includes(job)}
                />
              ))}
            </div>
          </section>

          {/* REMUNERATION */}
          <section className="spacingSection">
            <Label text="What are you working for" htmlFor="free" />
            <div className="remunerationList">
              <CheckableItem text="Fun" inputId="free" />
              <CheckableItem text="Revenue shares" inputId="shares" />
              <CheckableItem text="Fixed amount" inputId="gratification" />
              <CheckableItem text="Salary" inputId="salary" />
            </div>
          </section>

          {/* OTHER INFORMATIONS */}
          <section className="spacingSection">
            <Label text="Other informations" htmlFor="description" />
            <InputField
              placeholder="Describe yourself"
              inputType="textarea"
              inputId="description"
              inputName="description"
              isNumber={false}
              onChangeHandler={updateDescription}
              actualValue={description != undefined ? description : ""}
            />
            <InputField
              placeholder="Portfolio Link"
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
