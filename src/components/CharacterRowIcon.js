import React from 'react';
import { FaDiceD20 } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';

const CharacterRowIcon = (props) => {

  if(props.iconName === "dm") {
    return <FaDiceD20 />
  } else if (props.iconName === "player") {
    return <FaCheck />
  } else if (props.iconName === "na") {
    return <RiCloseLine />
  } else {
    return null
  }
}

export default CharacterRowIcon