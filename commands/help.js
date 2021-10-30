require('dotenv').config()
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const languages = require('../languages/language')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Show help on bot commands'),
   async execute(interaction) {
      const help = new MessageEmbed()
         .setColor('#d76844')
         .setAuthor(
            languages(interaction, 'HELPTITLE'),
            'https://i.imgur.com/6RkPJoM.png'
         )
         .setDescription(
            `${languages(interaction, 'HELPCOMMAND')}\n` +
               `${languages(interaction, 'PLAYERCOMMAND')}\n` +
               `${languages(interaction, 'STATSCOMMAND')}\n` +
               `${languages(interaction, 'LANGSETCOMMAND')}`
         )
      const buttons = new MessageActionRow().addComponents(
         await new MessageButton()
            .setStyle('LINK')
            .setURL('https://top.gg/bot/852565844529381397')
            .setLabel(languages(interaction, 'TOPGGBUTTON')),
         await new MessageButton()
            .setStyle('LINK')
            .setURL('https://discord.gg/Qsr8cAdjxW')
            .setLabel(languages(interaction, 'SUPPORTSERVERBUTTON'))
      )
      await interaction.reply({
         embeds: [help],
         components: [buttons],
         ephemeral: true
      })
   }
}
