import { readdirSync } from "fs"
import { Config } from "../config.js";

export default async (client) => {
    for (const file of readdirSync("./commands").filter(files => files.endsWith(".js"))) {
        try {
            const command = await import(`../commands/${file}`);

            const getAllCommands = (command, Prefix) => {
                return [
                    `${Prefix}${command.default.name}`,
                    ...command.default.aliases.map(alias => `${Prefix}${alias}`)
                ];
            };

            const isBotOwner = (message) => {
                return message.author.id === process.env.owner_id;
            };

            client.on('messageCreate', (message) => {
                const allCommands = getAllCommands(command, Config.Prefix);
                const args = message.content.split(" ");

                if (!allCommands.includes(args[0]) || message.author.id == client.user.id) return;

                if (command.default.otherOptions?.botOwner) {
                    if (isBotOwner(message)) {
                        command.default.run(client, message, args)
                    } else {
                        message.reply("- You don't have access to this command")
                    }
                } else {
                    command.default.run(client, message, args)
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
}