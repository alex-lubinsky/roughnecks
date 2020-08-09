import React from 'react';
import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";

const ResetEmailLanding = () => {

  return (
    <Container className="form-container form-bump-down">
      <NavLink to={`/`} >
        An email will be sent to you to reset your inbox. Click here to return to the log in page.
      </NavLink>
    </Container>
  )
}

export default ResetEmailLanding;