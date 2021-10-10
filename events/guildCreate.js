require('dotenv').config()
const { log } = require('../functions/log')
const { AutoPoster } = require('topgg-autoposter')

module.exports = {
    name: 'guildCreate',
    once: true,
    async execute(guild) {
        const autoPoster = AutoPoster(process.env.TOPGGTOKEN, guild.client)
        autoPoster.on('posted', () => {
            log("Top.gg statistic was updated!", 'Top.gg')
        })
        let systemChannel = guild.systemChannel
        if (systemChannel == null)
            return
        systemChannel.send(`Hey, server owner! You can set bot language via \`/languageset <language>\``)
    }
}