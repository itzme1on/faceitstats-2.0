require('dotenv').config()
const { readdirSync } = require('fs')
const languages = require('./languages/language')
const { Client, Collection, Intents, MessageEmbed } = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS]})
client.commands = new Collection()

const eventFiles = readdirSync('./events/').filter(file => file.endsWith('js'))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

const commandFiles = readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        const errorMessage = new MessageEmbed()
            .setColor('#ed4245')
            .setDescription(`${languages(interaction, 'ERROR')}`)
            .setFooter(`${languages(interaction, 'ERRORFOOTER')}`)
        return interaction.reply({
            embeds: [errorMessage],
            ephemeral: true
        })
    }
})

client.login(process.env.TOKEN)