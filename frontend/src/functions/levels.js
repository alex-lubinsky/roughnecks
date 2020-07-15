export const buildClassArray = (levelArray, classObject) => {
  let classArray = []

  levelArray.forEach(level => {
    classArray.push(classObject.find(classInstance => level.playerClass === classInstance.id))
  })

  return classArray
}



export const countClassOccurences = (arr) => {

  let result = {}

  arr.forEach((pcc) => {
    if (!result[pcc.className]) {
      if (pcc.isClass) {
        result[pcc.className] = {level: 1, subclassName: '', hasSubclass: false}
      } else {
        result[pcc.className] = {level: 1, subclassName: pcc.subclassName,  hasSubclass: true}
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
  })
  return result
}

export const getDowntimeDays = (missions, character, downtime) => {
  const numberOfMissions = missions.filter(mission => mission.visable === true).filter((mission) => mission.playedOn >= character.dateCreated).length;
  const dmCount = missions.filter((mission) => mission.dm === character.id).length
  const playCount = missions.filter(mission => mission.characters.some(pc => pc === character.id)).length
  const downtimeSpent = downtime.filter(dtTransaction => dtTransaction.character === character.id).map(dtTransaction => {
      return dtTransaction.numOfDaysSpent
    }).reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

  return ((dmCount*7+playCount*5+(numberOfMissions-dmCount-playCount)*2) - downtimeSpent)
}

export const getCheckmarks = (missions, character) => {
  const dmCount = missions.filter((mission) => mission.dm === character.id).length
  const playerCount = missions.filter(mission => mission.characters.some(pc => pc === character.id)).length
  
  return dmCount + playerCount
}

export const getLevel = (checkmarks) => {
  const levels = [0, 1, 4, 8, 12, 16, 21, 26, 31, 36, 42, 48, 54, 58, 67, 74, 81, 89, 98, 108]
  for (let i = 0; i < levels.length; i++) {

    if (levels[i] === checkmarks) {
      return i+1
    } else if (levels[i] > checkmarks && levels[i-1] < checkmarks) {
      return i
    } else if (checkmarks > 108) {
      return 20
    }
  }
}