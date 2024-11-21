export default {
    name: "ping",
    description: 'Execute a JavaScript code.',
    aliases: ['p', 'po'],
    otherOptions: {
        botOwner: false
    },

    run: async (client, message) => {
        message.reply("Pong")
    }
}