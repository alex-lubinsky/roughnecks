import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { resetPassword } from '../actions/auth';
import Container from 'react-bootstrap/Container';


const ResetEmail = () => {

  const [email, setEmail] = useState("")

  const onEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email)
  } 

  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
  }

  return (
    <Container className="form-container">
      <Form onSubmit={onSubmit}>
        <Container className="input-container">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text" 
            value={email} 
            onChange={onEmailChange}
            placeholder="Enter your Email Address" 
          />
        </Container>
        <Container className="button-container">
          <Button variant ="primary" type="submit">Submit</Button>
        </Container>
      </Form>
    </Container>


  )


}

export default ResetEmail;