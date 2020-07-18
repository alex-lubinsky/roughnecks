import React from 'react';
import { totalEarnedSpent } from '../functions/money';

const TotalEarnedMoney = (props) => {

  const {gold, silver, copper} = totalEarnedSpent(props.transactions.filter((transaction) => {
    return transaction.earnedSpent === 1;
  }))

  return (
    <div>
      <p>{`Total Gold: ${gold}, Total Silver: ${silver}, Total Copper: ${copper}`}</p>
    </div>
  )
}

export default TotalEarnedMoney;