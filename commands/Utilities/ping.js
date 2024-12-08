export default {
    name: "ping",
    description: 'Execute a JavaScript code.',
    usage: "ping",
    aliases: ['p', 'po'],
    
    otherOptions: {
        botOwner: false,
        cooldown: 4,
    },

    run: async (client, message, args) => {
        message.reply("Pong")
    }
}