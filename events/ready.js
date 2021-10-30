const { loadLanguages } = require('../languages/language')

module.exports = {
   name: 'ready',
   once: true,
   execute(client) {
      loadLanguages(client)
      console.log(`Hey! Bot login as ${client.user.tag}`)
      client.user.setPresence({
         status: 'online',
         activities: [
            {
               name: '/help',
               type: 'LISTENING'
            }
         ]
      })
   }
}
