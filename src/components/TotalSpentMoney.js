import React from 'react';
import { totalSpent } from '../functions/money';

const TotalSpentMoney = (props) => {

  const {gold, silver, copper} = totalSpent(props.transactions)

  return (
    <div>
      <p>{`Total Gold: ${gold}, Total Silver: ${silver}, Total Copper: ${copper}`}</p>
    </div>
  )
}

export default TotalSpentMoney;