import React, { useState } from "react";
import { resetPassword } from "../actions/auth";

const ResetEmail = () => {
  const [email, setEmail] = useState("");

  const onEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Email Address</label>
      <input
        type="text"
        value={email}
        onChange={onEmailChange}
        placeholder="Enter your Email Address"
      />
      <button variant="primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ResetEmail;
