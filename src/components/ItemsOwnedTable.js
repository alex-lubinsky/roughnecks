import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

const ItemsOwnedTable = (props) => {
  
  const [qty, setQty] = useState({});

  const onQtyChange = (e) => {
    setQty({ ...qty, [e.target.name]: e.target.value });
  };
  
  const onClick = (e) => {
    const ownedItemId = e.target.getAttribute("item-owned-id");
    const itemId = e.target.getAttribute("item-id");
    const removeSell = e.target.getAttribute("remove-sell");
    const qty = e.target.getAttribute("qty");
    props.onClick(ownedItemId, itemId, removeSell, qty);
  };

  return (
    <table className="width-100 table-highlights">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Gold</th>
          <th>Silver</th>
          <th>Copper</th>
          <th>Description</th>
          <th>Qty</th>
          {props.hasSellPermission ? (
            <>
              <th>Qty to Remove / Sell</th>
              <th>Remove</th>
              <th>Sell</th> 
            </>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {props.groupedItemsOwned.map((ownedItem) => {
          const item = props.items.find((item) => item.id === ownedItem.item);
          return (
            <tr className="mission-row" key={ownedItem.id}>
              <td>{item.name}</td>
              <td>{item.costGold}</td>
              <td>{item.costSilver}</td>
              <td>{item.costCopper}</td>
              <td>{item.description}</td>
              <td>{ownedItem.qty}</td>
              {props.hasSellPermission ? (
                <>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      step="1"
                      value={qty[ownedItem.id] || ""}
                      onChange={onQtyChange}
                      name={ownedItem.id}
                    />
                  </td>
                  <td>
                    <Button 
                      onClick={onClick} 
                      item-owned-id={ownedItem.id} 
                      item-id={item.id} 
                      remove-sell="remove" 
                      qty={qty[ownedItem.id]}
                    >
                      Remove
                    </Button>
                  </td>
                  <td>
                    <Button 
                      onClick={onClick} 
                      item-owned-id={ownedItem.id} 
                      item-id={item.id} 
                      remove-sell="sell"
                      qty={qty[ownedItem.id]}
                    >
                      Sell
                    </Button>
                  </td>
                </>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ItemsOwnedTable;
