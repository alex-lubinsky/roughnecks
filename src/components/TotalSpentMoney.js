import React from "react";
import { totalEarnedSpent } from "../functions/money";

const TotalSpentMoney = (props) => {
  const { gold, silver, copper } = totalEarnedSpent(
    props.transactions.filter((transaction) => {
      return transaction.earnedSpent === -1;
    })
  );

  return (
    <span>
      {`Total Gold: ${gold}, Total Silver: ${silver}, Total Copper: ${copper}`}
    </span>
  );
};

export default TotalSpentMoney;
