import React from 'react';
import Button from 'react-bootstrap/Button';
import { BsPencil } from 'react-icons/bs';

const EditButton = (props) => {

  const handleOnClick = () => {
    props.onClick(props.objectToPass, 'Edit')
  }

  return (
    <Button variant="link" onClick={handleOnClick}>
      <BsPencil />
    </Button>
  )
}

export default EditButton;