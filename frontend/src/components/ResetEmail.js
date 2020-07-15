import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { resetPassword } from '../actions/auth';


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
    <Form onSubmit={onSubmit}>
      <Form.Label>Email Address</Form.Label>
      <Form.Control
        type="text" 
        value={email} 
        onChange={onEmailChange}
        placeholder="Enter your Email Address" 
    />
    <Button variant ="primary" type="submit">Submit</Button>
    </Form>


  )


}

export default ResetEmail;