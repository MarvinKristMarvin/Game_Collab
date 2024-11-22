import FixedButtons from "../components/FixedButtons/FixedButtons";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import { useState } from "react";

function Profile() {
  const [showFixedButtons, setShowFixedButtons] = useState(false);
  console.log(showFixedButtons);
  return (
    <div className="profilePage">
      {/* if showFixedButtons is TRUE then show FixedButtons Component */}
      {showFixedButtons && <FixedButtons />}
      <Label />
      <InputField />
      <InputField />
      <Button />
      <Label />
      <InputField />
      <InputField />
      <InputField />
      <Button />
    </div>
  );
}

export default Profile;
