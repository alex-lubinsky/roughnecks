import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { startRemoveDowntime } from '../actions/downtime';


const DeleteDowntime = (props) => {
  
  const onClick = () => {
    props.startRemoveDowntime(props.downtime)
    props.handleClose();
  }
  
  return (
    <div>
      <Modal.Header closeButton>
        <h1>Delete Downtime Spend</h1>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <strong>Description: </strong>
              {props.downtime.description}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Character: </strong>
              {props.characters.find(character => character.id === props.downtime.character).fullName}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Type: </strong>
              {props.downtimeTypes.find(dtt => dtt.id === props.downtime.downtimeType).name}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Days Spent: </strong>
              {props.downtime.numOfDaysSpent}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClick}>
          Would you like to Delete this Downtime Transaction?
        </Button>
      </Modal.Footer>
      
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  startRemoveDowntime: (id) => dispatch(startRemoveDowntime(id)),
});

export default connect(undefined, mapDispatchToProps)(DeleteDowntime);
