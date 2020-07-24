import React from "react";

const SkymallTable = (props) => {
  return (
    <table>
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
          .filter((item) => item.numberInSkymall > 0 && item.allPcsCanPurchase)
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
                  <button
                    variant="success"
                    onClick={props.onBuyItemClick}
                    data-key={item.id}
                  >
                    Buy Item
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default SkymallTable;
