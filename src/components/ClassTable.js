// import React, { useState } from "react";
// import { RiPencilLine } from 'react-icons/ri';
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
// import Form from 'react-bootstrap/Form'
// import ClassForm from './ClassForm';
// import { buildClassArray } from '../functions/levels';
import React from 'react';

const getClassName = (pcClass, subclasses) => {
  let subclass = "";
  let subclassName = "";

  if (pcClass) {
    subclass = subclasses.find(
      (subclass) => subclass.id === pcClass.playerClass
    );
    if (subclass.isClass) {
      subclassName = subclass.subclassName;
    } else {
      subclassName = `${subclass.className} - ${subclass.subclassName}`;
    }
  } else {
    subclassName = null;
  }
  return subclassName;
};

const ClassTable = (props) => {

  // const [showEditLevelModal, setShowEditLevelModal] = useState(false)
  // const handleEditLevelModalClose = () => {
  //   setShowEditLevelModal(false);
  // }
  // const handleEditLevelModalOpen = () => {
  //   setShowEditLevelModal(true);
  // }

  // const onClassFormChange = (subclass) => {
  //   this.setState(
  //     {
  //       subclassName: subclass.subclassName,
  //       subclassValid: subclass.subclassValid,
  //     },
  //     this.validateForm
  //   );
  // };

  const rows = [];
  for (var i = 1; i < 11; i++) {
    rows.push(
      <tr key={i} className="class-row">
        <td>{i}.</td>
        <td>{getClassName(props.pcClasses[i - 1], props.subclasses)}</td>
        {/* <td><Button variant="light" onClick={handleEditLevelModalOpen}><RiPencilLine /></Button></td> */}
        <td>{i + 10}.</td>
        <td>{getClassName(props.pcClasses[i - 1 + 10], props.subclasses)}</td>
        {/* <td><Button variant="light" onClick={handleEditLevelModalOpen}><RiPencilLine /></Button></td> */}
      </tr>
    );
  }

  return (
    <>
      {/* <Modal show={showEditLevelModal} onHide={handleEditLevelModalClose}>
        <Modal.Header closeButton>
          <h1>Edit Level</h1>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <ClassForm 
              onChange={onClassFormChange}
              subclasses={props.subclasses}
              characterLevels={buildClassArray(
                props.pcClasses,
                props.subclasses
              )}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button>Edit Level</Button>
        </Modal.Footer>
      </Modal> */}
      <table className="width-100 table-highlights">
        <thead>
          <tr>
            <th className="width-5">Level #</th>
            <th className="width-20">Class Name</th>
            {/* <th>Edit</th> */}
            <th className="width-5">Level #</th>
            <th className="width-20">Class Name</th>
            {/* <th>Edit</th> */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

export default ClassTable;
