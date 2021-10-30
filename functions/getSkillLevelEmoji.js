function getSkillLevelEmoji(skillLevel) {
   let level = skillLevel
   let skillLevelEmoji
   if (level === 1) {
      skillLevelEmoji = `<:faceitlevel1:896560595858493490>`
   } else if (level === 2) {
      skillLevelEmoji = `<:faceitlevel2:896560178726600745>`
   } else if (level === 3) {
      skillLevelEmoji = `<:faceitlevel3:896558039551868971>`
   } else if (level === 4) {
      skillLevelEmoji = `<:faceitlevel4:896558039828672594>`
   } else if (level === 5) {
      skillLevelEmoji = `<:faceitlevel5:896558039702839307>`
   } else if (level === 6) {
      skillLevelEmoji = `<:faceitlevel6:896558040030003220>`
   } else if (level === 7) {
      skillLevelEmoji = `<:faceitlevel7:896558039354716172>`
   } else if (level === 8) {
      skillLevelEmoji = `<:faceitlevel8:896561868188024852>`
   } else if (level === 9) {
      skillLevelEmoji = `<:faceitlevel9:896558039853858856>`
   } else {
      skillLevelEmoji = `<:faceitlevel10:896558039908364348>`
   }
   return skillLevelEmoji
}

module.exports.getSkillLevelEmoji = getSkillLevelEmoji
