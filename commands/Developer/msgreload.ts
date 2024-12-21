import { Client, Message } from "discord.js"; 

export default {
    name: "msgreload",
    description: 'Realod Message Commands.',
    usage: "None",
    aliases: ['message-reload', 'reload'],
    
    otherOptions: {
        botOwner: true,
        cooldown: 0,
    },

    run: async (client: Client, message: Message, args: []) => {
        message.reply("Pong")
    }
}