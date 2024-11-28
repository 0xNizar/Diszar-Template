export default {
    name: "ping",
    description: 'Execute a JavaScript code.',
    aliases: ['p', 'po'],
    otherOptions: {
        botOwner: false
    },

    run: async (client, message, args) => {
        message.reply("Pong")
        message.reply(`Args 1: ${args[1]}`);
        message.reply(`Args 2: ${args[2]}`);
        message.reply(`Args 3: ${args[3]}`);
    }
}