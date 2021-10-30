const Faceit = require('faceit-js-api')
const { MessageEmbed } = require('discord.js')
const languages = require('../languages/language')
const faceit = new Faceit(process.env.FACEITAPITOKEN)

function getStats(nickname, resolve, interaction) {
   faceit
      .getPlayerInfo(nickname)
      .then(function (player) {
         player.games.csgo
            .getStats()
            .then(function (statistics) {
               if (resolve !== 'undefined') resolve([player, statistics])
               return [player, statistics]
            })
            .catch(function () {
               if (interaction) {
                  const cantGetPlayerInfo = new MessageEmbed()
                     .setColor('#d76844')
                     .setDescription(
                        `${languages(interaction, 'CANTGETPLAYERSTATISTIC')}`
                     )
                  interaction.reply({ embeds: [cantGetPlayerInfo] })
               }
            })
      })
      .catch(function () {
         if (interaction) {
            const playerNotPlayedCSGO = new MessageEmbed()
               .setColor('#d76844')
               .setDescription(
                  `${languages(interaction, 'PLAYERNOTPLAYEDCSGO')}`
               )
            interaction.reply({ embeds: [playerNotPlayedCSGO] })
         }
      })
}

module.exports.getStats = getStats
