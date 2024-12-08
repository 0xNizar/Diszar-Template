import { Collection } from "discord.js"
import { readdirSync } from "fs"
import { Config } from "../config.js";

export default async (client) => {
    for (const dir of readdirSync("./commands")) {
        for (const file of readdirSync(`./commands/${dir}`).filter(files => files.endsWith(".js"))) {
            try {
                const command = await import(`../commands/${dir}/${file}`);
    
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
    
                    const { cooldowns } = client;
    
                    if (!cooldowns.has(command.default.name)) {
                        cooldowns.set(command.default.name, new Collection());
                    }
    
                    const now = Date.now();
                    const timestamps = cooldowns.get(command.default.name);
                    const cooldownAmount = (command.default.otherOptions.cooldown || 3) * 1000;
    
                    if (timestamps.has(message.author.id)) {
                        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                        if (now < expirationTime && !isBotOwner(message)) {
                            const timeLeft = (expirationTime - now) / 1000;
                            return message.reply({
                                content: `Please wait ${timeLeft.toFixed(
                                    1
                                )} more second(s) before reusing the \`${command.default.name}\` command.`,
                            });
                        }
                    }
                    
                    timestamps.set(message.author.id, now);
                    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
                    if (command.default.otherOptions?.botOwner) {
                        if (isBotOwner(message)) {
                            command.default.run(client, message, args)
                        } else {
                            return message.reply({
                                content: `You don't have access to \`${command.default.name}\` command.`,
                            });
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

}