import React, { useState } from 'react';
import {resetPasswordConfirm} from '../actions/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ValidationMessage from './ValidationMessage';
import Container from 'react-bootstrap/Container';

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
    if (passwordOne === passwordTwo && passwordTwo !== "") {
      resetPasswordConfirm(
        {
          uid: props.match.params.uid,
          token: props.match.params.token,
          new_password1: passwordOne,
          new_password2: passwordTwo
        }
      )
    }
  }

  return (
    <Container className="form-container">
      <Form>
        <Container className="input-container">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="text" 
            value={passwordOne} 
            onChange={onPasswordOneChange}
            placeholder="Enter new password" 
          />
        </Container>
        <Container  className="input-container">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
          type="text" 
          value={passwordTwo} 
          onChange={onPasswordTwoChange}
          placeholder="Confirm Password" 
        />
        <ValidationMessage valid={passwordValid} message={errorMsg.password} />
        </Container>
      </Form>
      <Container className="button-container">
        <Button onClick={onClick}>Click Me</Button>
      </Container>
    </Container>
  )
}

export default ResetForm;