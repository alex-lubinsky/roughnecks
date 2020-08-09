export const totalEarnedSpent = (transactions) => {
  let gold = 0;
  let silver = 0;
  let copper = 0;

  transactions.forEach((transaction) => {
    if (transaction.airshipPot) {
      gold = (transaction.goldPcs * 0.9) / transaction.characters.length + gold;
      silver =
        (transaction.silverPcs * 0.9) / transaction.characters.length + silver;
      copper =
        (transaction.copperPcs * 0.9) / transaction.characters.length + copper;
    } else {
      gold = transaction.goldPcs / transaction.characters.length + gold;
      silver = transaction.silverPcs / transaction.characters.length + silver;
      copper = transaction.copperPcs / transaction.characters.length + copper;
    }
  });

  silver = silver + (gold - Math.floor(gold)) * 10;
  copper = copper + (silver - Math.floor(silver)) * 10;
  silver = Math.floor(silver);
  copper = Math.ceil(copper);

  silver = silver + Math.floor(copper / 10);
  gold = gold + Math.floor(silver / 10);
  silver = (silver / 10 - Math.floor(silver / 10)) * 10;
  copper = Math.floor((copper / 10 - Math.floor(copper / 10)) * 10);

  gold = Math.floor(gold);
  silver = Math.floor(silver);
  copper = Math.floor(copper);

  return { gold, silver, copper };
};

export const totalBalance = (transactions) => {
  let balanceGold = 0;
  let balanceSilver = 0;
  let balanceCopper = 0;

  const earnedMoney = totalEarnedSpent(
    transactions.filter((transaction) => {
      return transaction.earnedSpent === 1;
    })
  );

  const spentMoney = totalEarnedSpent(
    transactions.filter((transaction) => {
      return transaction.earnedSpent === -1;
    })
  );

  balanceCopper = earnedMoney.copper - spentMoney.copper;
  balanceSilver = earnedMoney.silver - spentMoney.silver;
  balanceGold = earnedMoney.gold - spentMoney.gold;
  if (balanceCopper < 0) {
    balanceSilver -= 1;
    balanceCopper += 10;
  }
  if (balanceSilver < 0) {
    balanceGold -= 1;
    balanceSilver += 10;
  }

  return {
    gold: Math.floor(balanceGold),
    silver: Math.floor(balanceSilver),
    copper: Math.floor(balanceCopper),
  };
};
