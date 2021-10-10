require('dotenv').config()
const Faceit = require('faceit-js-api')
const { MessageEmbed } = require('discord.js')
const languages = require('../languages/language')
const { getStats } = require('../functions/getStats')
const { getSkillLevelEmoji } = require('../functions/getSkillLevelEmoji')
const faceit = new Faceit(process.env.FACEITAPITOKEN)
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Display all player\'s statistic')
        .addStringOption(option => option
            .setName('nickname')
            .setDescription('Specify the nickname of the user whose statistics you want to find out')
            .setRequired(true)),
    async execute(interaction) {
        const nickname = interaction.options.getString('nickname')

        faceit.getPlayerInfo(nickname).then(function () {
            new Promise(function (resolve) {
                getStats(nickname, resolve, interaction)
            }).then(function (playerStatistic) {
                let player = playerStatistic[0]
                let stats = playerStatistic[1]

                let matches = stats.matches
                let wins = stats.wins
                let longestWinStreak = stats.longestWinStreak
                let currentWinStreak = stats.currentWinStreak
                let winRate = stats.winRate
                let skillLevel = player.games.csgo.skillLevel
                let elopoints = player.games.csgo.faceitElo
                let hsPercentage = stats.averageHeadshots
                let totalHeadshots = stats.totalHeadshots
                let averageKDRatio = stats.averageKDRatio

                if (!matches)
                    matches = `${languages(interaction, 'NOTAVAILABLE')}`
                if (!wins)
                    wins = `${languages(interaction, 'NOTAVAILABLE')}`
                if (!longestWinStreak)
                    longestWinStreak = `${languages(interaction, 'NOTAVAILABLE')}`
                if (!currentWinStreak)
                    currentWinStreak = `${languages(interaction, 'NOTAVAILABLE')}`
                if (!winRate)
                    winRate = `${languages(interaction, 'NOTAVAILABLE')}`

                const allPlayerStatistic = new MessageEmbed()
                    .setColor('#d76844')
                    .setAuthor(player.nickname, 'https://media.discordapp.net/attachments/896523909892022323/896636790180569099/faceit.png', player.faceitUrl)
                    .setThumbnail(player.avatar)
                    .addFields(
                        {name: `${languages(interaction, 'PLAYERCOUNTRY')}`, value: `${player.country}`, inline: true},
                        {name: `${languages(interaction, 'SKILLLEVEL')}`, value: `${getSkillLevelEmoji(skillLevel)}`, inline: true},
                        {name: `${languages(interaction, 'STEAMNAME')}`, value: `${player.steamNickname}`, inline: true})
                    .addFields(
                        {name: `${languages(interaction, 'MATCHESPLAYED')}`, value: `${matches}`, inline: true},
                        {name: `${languages(interaction, 'WINS')}`, value: `${wins}`, inline: true},
                        {name: `${languages(interaction, 'CURRENTELO')}`, value: `${elopoints}`, inline: true})
                    .addFields(
                        {name: `${languages(interaction, 'LONGESTWINSTREAK')}`, value: `${languages(interaction, 'WINS')}: ${longestWinStreak}`, inline: true},
                        {name: `${languages(interaction, 'CURRENTWINSTREAK')}`, value: `${languages(interaction, 'WINS')}: ${currentWinStreak}`, inline: true},
                        {name: `${languages(interaction, 'WINRATE')}`, value: `${winRate}%`, inline: true})
                    .addFields(
                        {name: `${languages(interaction, 'AVERAGEHEADSHOTSPERCENTAGE')}`, value: `${hsPercentage}%`, inline: true},
                        {name: `${languages(interaction, 'TOTALHEADSHOTSCOUNT')}`, value: `${totalHeadshots}`, inline: true},
                        {name: `${languages(interaction, 'KD')}`, value: `${averageKDRatio}`, inline: true})
                interaction.reply({ embeds: [allPlayerStatistic] })
            })
        })
    }
}