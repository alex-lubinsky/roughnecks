import React, { useState } from "react";
import { resetPasswordConfirm } from "../actions/auth";
import ValidationMessage from "./ValidationMessage";

const ResetForm = (props) => {
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});

  const onPasswordOneChange = (e) => {
    const passwordOne = e.target.value;
    setPasswordOne(passwordOne);
  };

  const onPasswordTwoChange = (e) => {
    const passwordTwo = e.target.value;
    setPasswordTwo(passwordTwo);
  };

  const onClick = (e) => {
    e.preventDefault();
    if (passwordOne === passwordTwo && passwordTwo !== "") {
      resetPasswordConfirm({
        uid: props.match.params.uid,
        token: props.match.params.token,
        new_password1: passwordOne,
        new_password2: passwordTwo,
      });
    }
  };

  return (
    <div>
      <form>
        <label>Password</label>
        <input
          type="text"
          value={passwordOne}
          onChange={onPasswordOneChange}
          placeholder="Enter new password"
        />
        <label>Confirm Password</label>
        <input
          type="text"
          value={passwordTwo}
          onChange={onPasswordTwoChange}
          placeholder="Confirm Password"
        />
        <ValidationMessage valid={passwordValid} message={errorMsg.password} />
      </form>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
};

export default ResetForm;
