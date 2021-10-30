const mongo = require('../database/mongo')
const languageSchema = require('../schemas/language-schema')
const lang = require('./lang.json')

const guildLanguages = {}

const loadLanguages = async (client) => {
   await mongo().then(async (mongoose) => {
      try {
         for (const guild of client.guilds.cache) {
            const guildID = guild[0]

            const result = await languageSchema.findOne({
               _id: guildID
            })

            guildLanguages[guildID] = result ? result.language : 'english'
         }
      } finally {
         await mongoose.connection.close()
      }
   })
}

const setLanguage = (guild, language) => {
   guildLanguages[guild.id] = language.toLowerCase()
}

module.exports = (interaction, textID) => {
   if (!lang.translations[textID]) {
      throw new Error(`Unknown text ID: ${textID}`)
   }

   const selectedLanguage = guildLanguages[interaction.guild.id]

   return lang.translations[textID][selectedLanguage]
}

module.exports.loadLanguages = loadLanguages
module.exports.setLanguage = setLanguage
