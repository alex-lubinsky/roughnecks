import React from 'react';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const SkymallTable = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cost (in gold)</th>
          <th>Cost (in downtime)</th>
          <th>Desctiption</th>
          <th>Number in Skymall</th>
          <th>Buy</th>
        </tr>
      </thead>
      <tbody>
        {props.filteredItems
          .filter((item) => (item.numberInSkymall > 0 && item.allPcsCanPurchase) )
          .map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {`${item.costGold}.${item.costSilver}${item.costCopper}`}{" "}
                </td>
                <td>{item.downtimecost}</td>
                <td>{item.description}</td>
                <td>{item.numberInSkymall}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={props.onBuyItemClick}
                    data-key={item.id}
                  >
                    Buy Item
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  )
}

export default SkymallTable;