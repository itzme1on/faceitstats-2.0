require('dotenv').config()
const Faceit = require('faceit-js-api')
const { MessageEmbed } = require('discord.js')
const languages = require('../languages/language')
const { getStats } = require('../functions/getStats')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { getSkillLevelEmoji } = require('../functions/getSkillLevelEmoji')
const faceit = new Faceit(process.env.FACEITAPITOKEN)

module.exports = {
   data: new SlashCommandBuilder()
      .setName('player')
      .setDescription('Display short player statistic')
      .addStringOption((option) =>
         option
            .setName('nickname')
            .setDescription(
               'Specify the nickname of the user whose statistics you want to find out'
            )
            .setRequired(true)
      ),
   async execute(interaction) {
      const nickname = interaction.options.getString('nickname')

      faceit
         .getPlayerInfo(nickname)
         .then(function () {
            new Promise(function (resolve) {
               getStats(nickname, resolve, interaction)
            }).then(function (playerStatistic) {
               let player = playerStatistic[0]
               let skillLevel = player.games.csgo.skillLevel
               let elopoints = player.games.csgo.faceitElo

               const playerInfo = new MessageEmbed()
                  .setColor('#d76844')
                  .setAuthor(player.nickname, player.avatar, player.faceitUrl)
                  .addFields(
                     {
                        name: `${languages(interaction, 'PLAYERCOUNTRY')}`,
                        value: player.country,
                        inline: true
                     },
                     {
                        name: `${languages(interaction, 'SKILLLEVEL')}`,
                        value: `${getSkillLevelEmoji(skillLevel)}`,
                        inline: true
                     },
                     {
                        name: `${languages(interaction, 'CURRENTELO')}`,
                        value: `${elopoints}`,
                        inline: true
                     }
                  )
               interaction.reply({ embeds: [playerInfo] })
            })
         })
         .catch(() => {
            const cantGetPlayerStatistic = new MessageEmbed()
               .setColor('#d76844')
               .setDescription(
                  `${languages(interaction, 'CANTGETPLAYERSTATISTIC')}`
               )
            interaction.reply({
               embeds: [cantGetPlayerStatistic],
               ephemeral: true
            })
         })
   }
}
