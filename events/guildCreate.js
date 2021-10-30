require('dotenv').config()
const { log } = require('../functions/log')
const { MessageEmbed } = require('discord.js')
const { AutoPoster } = require('topgg-autoposter')

module.exports = {
   name: 'guildCreate',
   once: true,
   async execute(guild) {
      const autoPoster = AutoPoster(process.env.TOPGGTOKEN, guild.client)
      autoPoster.on('posted', () => {
         log('Top.gg statistic was updated!', 'Top.gg')
      })
      let systemChannel = guild.systemChannel
      if (systemChannel == null) return
      systemChannel.send(
         `Hey, server owner! You can set bot language via \`/languageset <language>\``
      )
      let client = guild.client
      client.users.fetch(process.env.OWNERID).then((owner) => {
         client.users.fetch(guild.ownerId).then((guildOwner) => {
            const botAdd = new MessageEmbed()
               .setColor('#00b200')
               .setAuthor(`${guild.name} invite me!`)
               .setDescription(`Server owner: **${guildOwner.tag}**`)
               .setFooter(`I'm on ${client.guilds.cache.size} servers!`)
               .setTimestamp()

            owner.send({
               embeds: [botAdd]
            })
         })
      })
   }
}
