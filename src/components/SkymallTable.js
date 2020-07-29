import React from "react";
import Button from 'react-bootstrap/Button'

const SkymallTable = (props) => {
  return (
    <table className="skymall-table skymall-list">
      <thead>
        <tr>
          <th className="character-class">Name</th>
          <th className="character-race">Cost (in gold)</th>
          <th>Desctiption</th>
          <th className="character-race">Number in Skymall</th>
          {props.skymallAdmin === true ? 
            <th className="character-race">Add to Skymall</th> :
            <th className="character-race">Buy</th>
          } 
        </tr>
      </thead>
      <tbody>
        {props.filteredItems
          .map((item) => {
            return (
              <tr key={item.id} className="skymall-row">
                <td>{item.name}</td>
                <td>
                  {`${item.costGold}.${item.costSilver}${item.costCopper}`}{" "}
                </td>
                <td>{item.description}</td>
                <td>{item.numberInSkymall}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={props.onClick}
                    data-key={item.id}
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
