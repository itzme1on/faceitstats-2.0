require('dotenv').config()
const mongo = require('../database/mongo')
const languages = require('../languages/language')
const languageSchema = require('../schemas/language-schema')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('languageset')
      .setDescription('Set bot language (only for server owners)')
      .addStringOption((option) =>
         option
            .setName('language')
            .setDescription('Choose one of the available languages')
            .setRequired(true)
            .addChoice('English', 'english')
            .addChoice('Русский', 'russian')
      ),
   async execute(interaction) {
      const language = interaction.options.getString('language')
      const guild = interaction.guild
      const guildOwner = interaction.guild.ownerId

      if (interaction.user.id !== guildOwner) {
         await interaction.reply({
            content: `${languages(interaction, 'NOPERMISSIONS')}`
         })
         return
      }

      await mongo().then(async (mongoose) => {
         try {
            await languageSchema.findOneAndUpdate(
               {
                  _id: guild.id
               },
               {
                  _id: guild.id,
                  language: language
               },
               {
                  upsert: true
               }
            )
            languages.setLanguage(guild, language)
            await interaction.reply({
               content: `${languages(interaction, 'SUCCESSFULLYSETLANGUAGE')}`
            })
         } finally {
            await mongoose.connection.close()
         }
      })
   }
}
