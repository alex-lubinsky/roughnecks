import React, { useState } from "react";
import Select from "react-select";
import ValidationMessage from "./ValidationMessage";
import { countClassOccurences } from "../functions/levels";
import Form from 'react-bootstrap/Form'
import {AiOutlineCheck} from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';


const ClassForm = (props) => {
  const [subclassName, setSubclassName] = useState("");
  const [filteredSubclasses, setFilteredSubclasses] = useState([]);
  const [subclassValid, setSubclassValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [subclassVisable, setSubclassVisable] = useState(false);

  const classCount = props.characterLevels
    ? countClassOccurences(props.characterLevels)
    : {};

  const getClassOptions = () => {
    return props.subclasses
      .filter((subclass) => subclass.isClass === true)
      .sort((a, b) => (a.className > b.className ? 1 : -1))
      .map((subclass) => {
        return {
          value: subclass.id,
          label: subclass.subclassName,
          subclassLevel: subclass.subclassLevel,
          className: subclass.className,
        };
      });
  };

  const onClassChange = (selectedItem) => {
    const pcClassLevels = classCount[selectedItem.label]
      ? classCount[selectedItem.label].level
      : 0;

    if (selectedItem.subclassLevel === pcClassLevels + 1) {
      const filteredlist = props.subclasses.filter((subclass) => {
        return (
          subclass.className === selectedItem.className && !subclass.isClass
        );
      });
      setFilteredSubclasses(filteredlist);
      setSubclassName("");
      setSubclassValid(false);
      setSubclassVisable(true);
      setErrorMsg({ subclass: "Must Select a Subclass" });
      onChange("", false);
    } else {
      setSubclassVisable(false);
      setErrorMsg({});
      setSubclassValid(true);
      setFilteredSubclasses([]);
      setSubclassName(selectedItem.value);
      onChange(selectedItem.value, true);
    }
  };

  const onSubclassChange = (selectedItem) => {
    setSubclassName(selectedItem);
    setErrorMsg({});
    setSubclassValid(true);
    onChange(selectedItem.value, true);
  };

  const onChange = (subclassName, subclassValid) => {
    props.onChange({
      subclassName: subclassName,
      subclassValid: subclassValid,
    });
  };

  const selectSubclassOptions = filteredSubclasses.sort().map((subclass) => {
    return { value: subclass.id, label: subclass.subclassName };
  });

  return (
    <>
      <Form.Group>
        <span className={subclassValid ? "valid-input" : "invalid-input"}>
          <Form.Label>Class</Form.Label>
          {subclassValid ? <AiOutlineCheck /> : <IoMdClose />}
        </span>
        <Select
          id="class"
          name="class"
          options={getClassOptions()}
          onChange={onClassChange}
        />
      </Form.Group>

      {subclassVisable ? (
        <Form.Group>
          <span className={subclassValid ? "valid-input" : "invalid-input"}>
            <Form.Label>Subclass</Form.Label>
            {subclassValid ? <AiOutlineCheck /> : <IoMdClose />}
          </span>
          <Select
            options={selectSubclassOptions}
            onChange={onSubclassChange}
            value={subclassName}
            id="subclass"
            name="subclass"
          />
        </Form.Group>
      ) : null}
      <ValidationMessage valid={subclassValid} message={errorMsg.subclass} />
    </>
  );
};

export default ClassForm;
