import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import PositiveMessage from "../components/PositiveMessage/PositiveMessage";
import CheckableItem from "../components/CheckableItem/CheckableItem";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLoggedUser } from "../context/userContext";

function Profile() {
  const [connected, setConnected] = useState(false);
  const { loggedUser, setLoggedUser } = useLoggedUser();
  if (loggedUser) {
    setConnected(true);
  }

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
        toast.success("Log in successfull ! Please log in");
        console.log("log in success !");
        console.log(data);
        setLoginData({ mail: "", password: "" });
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

  const save = () => {
    console.log("save");
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
  } else if (user !== null) {
    // If user is authenticated show the profile page
    return (
      <div className="profilePage">
        <PositiveMessage text="You are successfully logged in, you can edit your profile and share it to others" />
        <p>{user.mail}</p>
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
              />
              <InputField
                placeholder="Age"
                inputType="text"
                inputId="age"
                inputName="age"
              />
            </div>
          </section>

          {/* LANGUAGES */}
          <section className="spacingSection">
            <Label text="Select your working languages" htmlFor="english" />
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
            <Label text="What jobs can you do" htmlFor="code" />
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
            />
            <InputField
              placeholder="Portfolio Link"
              inputType="text"
              inputId="portfolio"
              inputName="portfolio"
            />
            <InputField
              placeholder="Contact mail"
              inputType="text"
              inputId="mail"
              inputName="mail"
            />
          </section>
          <Button text="Save" func={save} />
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
