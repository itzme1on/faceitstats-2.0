require('dotenv').config()
const { log } = require('../functions/log')
const { MessageEmbed } = require('discord.js')
const { AutoPoster } = require('topgg-autoposter')

module.exports = {
   name: 'guildDelete',
   once: true,
   async execute(guild) {
      const autoPoster = AutoPoster(process.env.TOPGGTOKEN, guild.client)
      autoPoster.on('posted', () => {
         log('Top.gg statistic was updated!', 'Top.gg')
      })
      let client = guild.client
      client.users.fetch(process.env.OWNERID).then((owner) => {
         const botKick = new MessageEmbed()
            .setColor('#d76844')
            .setAuthor(`${guild.name} kick me :(`)
            .setFooter(`I'm on ${client.guilds.cache.size} servers!`)
            .setTimestamp()

         owner.send({
            embeds: [botKick]
         })
      })
   }
}
