import React from 'react'
import Button from 'react-bootstrap/Button'


const ItemsOwnedTable = (props) => {

  const onClick = (e) => {
    const itemId = e.target.getAttribute("data-key");
    props.onClick(itemId)
  }

  return (
    <table className="mission-table mission-list">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Gold</th>
          <th>Silver</th>
          <th>Copper</th>
          <th>Description</th>
          <th>Sell</th>
        </tr>
      </thead>
      <tbody>
        {props.itemsOwned.map(ownedItem => {
          const item = props.items.find(item => item.id === ownedItem.item)
          return (
            <tr className="mission-row" key={ownedItem.id}>
              <td>{item.name}</td>
              <td>{item.costGold}</td>
              <td>{item.costSilver}</td>
              <td>{item.costCopper}</td>
              <td>{item.description}</td>
              <td><Button onClick={onClick} data-key={ownedItem.id}>Sell Item</Button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ItemsOwnedTable;