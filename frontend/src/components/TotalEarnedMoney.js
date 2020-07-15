import React from 'react';
import { totalEarned } from '../functions/money';

const TotalEarnedMoney = (props) => {

  const {gold, silver, copper} = totalEarned(props.transactions)

  return (
    <div>
      <p>{`Total Gold: ${gold}, Total Silver: ${silver}, Total Copper: ${copper}`}</p>
    </div>
  )
}

export default TotalEarnedMoney;