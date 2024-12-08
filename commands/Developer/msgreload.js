export default {
    name: "msgreload",
    description: 'Realod Message Commands.',
    usage: "None",
    aliases: ['message-reload', 'reload'],
    
    otherOptions: {
        botOwner: true,
        cooldown: 0,
    },

    run: async (client, message, args) => {
        message.reply("Pong")
    }
}