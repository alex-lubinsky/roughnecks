import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SkymallTable = (props) => {
  const [qty, setQty] = useState({});

  const onQtyChange = (e) => {
    setQty({ ...qty, [e.target.name]: e.target.value });
  };

  return (
    <table className="width-100 table-highlights">
      <thead>
        <tr>
          <th className="width-20">Name</th>
          <th className="width-10">Cost (in gold)</th>
          <th>Desctiption</th>
          <th className="width-10">Number in Skymall</th>
          <th className="width-10">
            Qty to {props.skymallAdmin === true ? "Add" : "Buy"}
          </th>
          {props.skymallAdmin === true ? (
            <th className="width-10">Add to Skymall</th>
          ) : (
            <th className="width-10">Buy</th>
          )}
        </tr>
      </thead>
      <tbody>
        {props.filteredItems.map((item) => {
          return (
            <tr key={item.id} className="skymall-row">
              <td>{item.name}</td>
              <td>
                {`${item.costGold}.${item.costSilver}${item.costCopper}`}{" "}
              </td>
              <td>{item.description}</td>
              <td>{item.numberInSkymall}</td>
              <td>
                <Form.Control
                  type="number"
                  min="0"
                  step="1"
                  value={qty[item.id] || ""}
                  onChange={onQtyChange}
                  name={item.id}
                />
              </td>
              <td>
                <Button
                  variant="success"
                  onClick={props.onClick}
                  data-key={item.id}
                  data-qty={qty[item.id]}
                >
                  {props.skymallAdmin ? "Add Item" : "Buy Item"}
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SkymallTable;
