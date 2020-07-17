export const totalEarned = (transactions) => {

  let gold = 0;
  let silver = 0;
  let copper = 0;

  transactions.filter((transaction) => {
    return transaction.earnedSpent === 1;
  }).forEach((transaction) => {
    if (transaction.airshipPot) {
      gold = transaction.goldPcs * .9 + gold;
      silver = transaction.silverPcs * .9 + silver;
      copper = transaction.copperPcs * .9 + copper;
    } else {
      gold = transaction.goldPcs + gold;
      silver = transaction.silverPcs + silver;
      copper = transaction.copperPcs + copper;
    }

  });

  silver = silver + (gold - Math.floor(gold)) * 10
  copper = copper + (silver - Math.floor(silver)) * 10
  silver = Math.floor(silver)
  copper = Math.ceil(copper)
    
  silver = silver + Math.floor(copper / 10);
  gold = gold + Math.floor(silver / 10);
  silver = (silver / 10 - Math.floor(silver / 10)) * 10;
  copper = (copper / 10 - Math.floor(copper / 10)) * 10;

  return {gold, silver, copper}
}

export const totalSpent = (transactions) => {

  let gold = 0;
  let silver = 0;
  let copper = 0;

  transactions.filter((transaction) => {
    return transaction.earnedSpent === -1;
  }).forEach((transaction) => {
    if (transaction.airshipPot) {
      gold = transaction.goldPcs * .9 + gold;
      silver = transaction.silverPcs * .9 + silver;
      copper = transaction.copperPcs * .9 + copper;
    } else {
      gold = transaction.goldPcs + gold;
      silver = transaction.silverPcs + silver;
      copper = transaction.copperPcs + copper;
    }
  });

  silver = silver + (gold - Math.floor(gold)) * 10
  copper = copper + (silver - Math.floor(silver)) * 10
  silver = Math.floor(silver)
  copper = Math.ceil(copper)
    
  silver = silver + Math.floor(copper / 10);
  gold = gold + Math.floor(silver / 10);
  silver = (silver / 10 - Math.floor(silver / 10)) * 10;
  copper = (copper / 10 - Math.floor(copper / 10)) * 10;

  return {gold, silver, copper}
}

export const totalBalance = (transactions) => {

  let balanceGold = 0;
  let balanceSilver = 0;
  let balanceCopper = 0;

  const earnedMoney = totalEarned(transactions)
  const spentMoney = totalSpent(transactions)
  

  console.log(earnedMoney, spentMoney)

  balanceCopper = earnedMoney.copper - spentMoney.copper
  balanceSilver = earnedMoney.silver - spentMoney.silver
  balanceGold = earnedMoney.gold - spentMoney.gold
  if (balanceCopper < 0) {
    balanceSilver -= 1
    balanceCopper += 10
  }
  if (balanceSilver < 0) {
    balanceGold -= 1
    balanceSilver += 10
  } 

  return {gold: balanceGold, silver: balanceSilver, copper: balanceCopper}
}