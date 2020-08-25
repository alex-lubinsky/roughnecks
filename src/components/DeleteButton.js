import React from 'react';
import Button from 'react-bootstrap/Button';
import { BsTrash } from 'react-icons/bs';

const DeleteButton = (props) => {

  const handleOnClick = () => {
    props.onClick(props.objectToPass, 'Delete')
  }

  return (
    <Button variant="link" onClick={handleOnClick}>
      <BsTrash />
    </Button>
  )
}

export default DeleteButton;