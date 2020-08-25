import React from "react";
import { connect } from "react-redux";
import { startRemoveTransaction } from "../actions/transactions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DeleteTransactionForm = (props) => {

  const onClick = () => {
    props.startRemoveTransaction(props.transaction)
    props.handleClose();
  }

  return (
    <div>
      <Modal.Header closeButton>
        <h1>Delete Transaction</h1>
      </Modal.Header>
      <Modal.Body>
      <Container>
          <Row>
            <Col>
              <strong>Name: </strong>
              {props.transaction.name}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Gold: </strong>
              {props.transaction.goldPcs}
            </Col>
            <Col>
              <strong>Silver: </strong>
              {props.transaction.silverPcs}
            </Col>
            <Col>
              <strong>Copper: </strong>
              {props.transaction.copperPcs}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Spent or Earned: </strong>
              {props.transaction.earnedSpent === 1 ? "Earned" : "Spent"}
            </Col>
            <Col>
              <strong>Airship Pot: </strong>
              {props.transaction.airshipPot === true ? "Yes" : "No"}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Mission: </strong>
              {props.missions.find(mission => mission.id === props.transaction.mission).name}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Characters: </strong>
              <ul>
                {props.transaction.characters.map(character => {
                  const pc = props.characters.find(pc => pc.id === character)
                  return <li key={pc.id}>{pc.fullName}</li>
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClick}>
          Delete Transaction
        </Button>
      </Modal.Footer>
    </div>
  );
};


const mapDispatchToProps = (dispatch, props) => ({
  startRemoveTransaction: (transaction) => dispatch(startRemoveTransaction(transaction)),
});

const mapStatetoProps = (state, props) => ({
  missions: state.missions.data,
  characters: state.characters.data
});

export default connect(mapStatetoProps, mapDispatchToProps)(DeleteTransactionForm);