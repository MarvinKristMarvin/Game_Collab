import FixedButtons from "../components/FixedButtons/FixedButtons";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import PositiveMessage from "../components/PositiveMessage/PositiveMessage";
import { useState } from "react";

function Profile() {
  const [connected, setConnected] = useState(true);

  /* functions when buttons are clicked on */
  const login = () => {
    console.log("login logic");
  };
  const signup = () => {
    console.log("signup logic");
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

  /* if user is not authentified, show login signup page, else show profile page */
  if (connected === false) {
    return (
      <div className="profilePage">
        <form>
          <Label text="Log in to modify your profile" htmlFor="login-email" />
          <InputField
            placeholder="Mail"
            inputType="email"
            inputId="login-email"
            inputName="login-email"
          />
          <InputField
            placeholder="Password"
            inputType="password"
            inputId="login-password"
            inputName="login-password"
          />
          <Button text="Log in" func={login} />
        </form>
        <form>
          <Label
            text="Or sign up if you don't have an account yet !"
            htmlFor="signup-email"
          />
          <InputField
            placeholder="Mail"
            inputType="email"
            inputId="signup-email"
            inputName="signup-email"
          />
          <InputField
            placeholder="Password"
            inputType="password"
            inputId="signup-password"
            inputName="signup-password"
          />
          <InputField
            placeholder="Confirm password"
            inputType="password"
            inputId="confirm-password"
            inputName="confirm-password"
          />
          <Button text="Sign up" func={signup} />
        </form>
      </div>
    );
  } else {
    return (
      <div className="profilePage">
        <PositiveMessage text="You are successfully logged in, you can edit your profile and share it to others" />
        <form action="">
          <Label text="Enter your name and age" htmlFor="name" />
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
          <Label text="Select your working languages" htmlFor="name" />
          <Label text="What jobs can you do" htmlFor="name" />
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
