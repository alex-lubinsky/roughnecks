export const buildClassArray = (levelArray, classObject) => {
  let classArray = [];

  levelArray.forEach((level) => {
    classArray.push(
      classObject.find(
        (classInstance) => level.playerClass === classInstance.id
      )
    );
  });

  return classArray;
};

export const countClassOccurences = (arr) => {
  let result = {};

  arr.forEach((pcc) => {
    if (!result[pcc.className]) {
      if (pcc.isClass) {
        result[pcc.className] = {
          level: 1,
          subclassName: "",
          hasSubclass: false,
        };
      } else {
        result[pcc.className] = {
          level: 1,
          subclassName: pcc.subclassName,
          hasSubclass: true,
        };
      }
    } else {
      if (pcc.isClass) {
        result[pcc.className].level = result[pcc.className].level + 1;
      } else {
        result[pcc.className].level = result[pcc.className].level + 1;
        result[pcc.className].subclassName = pcc.subclassName;
        result[pcc.className].hasSubclass = true;
      }
    }
  });
  return result;
};

export const getDowntimeDays = (missions, character, downtime, pcLevels) => {
  let downtimeDayTotal = 0;

  missions.forEach((mission) => {
    if (mission.characters.includes(character.id)) {
      downtimeDayTotal += 5;
    } else if (mission.dm === character.id) {
      downtimeDayTotal += 7;
    } else {
      const levelAtTimeOfMission = pcLevels.filter(
        (level) => level.dateCreated <= mission.playedOn
      ).length;
      console.log(mission.episode, props.character.fullName, (character.dateOfDeath ? character.dateOfDeath <= mission.playedOn : true))
      if (
        mission.playedOn >= character.dateCreated &&
        levelAtTimeOfMission >= mission.levelMin &&
        levelAtTimeOfMission <= mission.levelMax &&
        (character.dateOfDeath ? character.dateOfDeath <= mission.playedOn : true)
      ) {
        downtimeDayTotal += 2;
      }
    }
  });

  const downtimeSpent = downtime
    .filter((dtTransaction) => dtTransaction.character === character.id)
    .map((dtTransaction) => {
      return dtTransaction.numOfDaysSpent;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  return downtimeDayTotal - downtimeSpent;
};

export const getCheckmarks = (missions, character, downtime) => {
  const dmCount = missions.filter((mission) => mission.dm === character.id)
    .length;
  const playerCount = missions.filter((mission) =>
    mission.characters.some((pc) => pc === character.id)
  ).length;
  const downtimeCheckmarks = Math.floor(
    downtime
      .filter((dtTransaction) => {
        return (
          dtTransaction.downtimeType === "TR" &&
          dtTransaction.character === character.id
        );
      })
      .map((transaction) => {
        return transaction.numOfDaysSpent;
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0) / 10
  )

  return dmCount + playerCount + downtimeCheckmarks + character.startingCheckmarks;
};

export const getLevel = (checkmarks) => {
  const levels = [
    0,
    1,
    4,
    8,
    12,
    16,
    21,
    26,
    31,
    36,
    42,
    48,
    54,
    58,
    67,
    74,
    81,
    89,
    98,
    108,
  ];
  for (let i = 0; i < levels.length; i++) {
    if (levels[i] === checkmarks) {
      return i + 1;
    } else if (levels[i] > checkmarks && levels[i - 1] < checkmarks) {
      return i;
    } else if (checkmarks > 108) {
      return 20;
    }
  }
};
