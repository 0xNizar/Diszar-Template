import { Client, Message } from "discord.js"; 

export default {
    name: "ping",
    description: 'Execute a JavaScript code.',
    usage: "ping",
    aliases: ['p', 'po'],
    
    otherOptions: {
        botOwner: false,
        cooldown: 4,
    },

    run: async (client: Client, message: Message, args: []) => {
        message.reply("Pong")
    }
}