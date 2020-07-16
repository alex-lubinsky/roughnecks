import React from 'react';
import { totalBalance } from '../functions/money';

const TotalBalanceMoney = (props) => {

  const {gold, silver, copper} = totalBalance(props.transactions)

  return (
    <div>
      <p>{`Total Gold: ${gold}, Total Silver: ${silver}, Total Copper: ${copper}`}</p>
    </div>
  )
}

export default TotalBalanceMoney;