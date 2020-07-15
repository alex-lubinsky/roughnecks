import React, { useState } from 'react';
import {resetPasswordConfirm} from '../actions/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ValidationMessage from './ValidationMessage';

const ResetForm = (props) => {
  
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})

  const onPasswordOneChange = (e) => {
    const passwordOne = e.target.value;
    setPasswordOne(passwordOne)
  };

  const onPasswordTwoChange = (e) => {
    const passwordTwo = e.target.value;
    setPasswordTwo(passwordTwo)
  };

  const onClick = (e) => {
    e.preventDefault();
    resetPasswordConfirm(
      {
        uid: props.match.params.uid,
        token: props.match.params.token,
        new_password1: passwordOne,
        new_password2: passwordTwo
      }
    )
  }

  return (
    <div>
      <Form>
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="text" 
          value={passwordOne} 
          onChange={onPasswordOneChange}
          placeholder="Enter new password" 
        />
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
          type="text" 
          value={passwordTwo} 
          onChange={onPasswordTwoChange}
          placeholder="Confirm Password" 
        />
        <ValidationMessage valid={passwordValid} message={errorMsg.password} />
      </Form>
      <Button onClick={onClick}>Click Me</Button>
    </div>
  )
}

export default ResetForm;