require('dotenv').config()
const { log } = require('../functions/log')
const { AutoPoster } = require('topgg-autoposter')

module.exports = {
   name: 'guildDelete',
   once: true,
   async execute(guild) {
      const autoPoster = AutoPoster(process.env.TOPGGTOKEN, guild.client)
      autoPoster.on('posted', () => {
         log('Top.gg statistic was updated!', 'Top.gg')
      })
   }
}
