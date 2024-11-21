import { Client, GatewayIntentBits } from 'discord.js';
import { readdirSync } from "fs"
import { Config } from "./config.js";
import dotenv from 'dotenv';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Load environment variables
dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

(async () => {
  for (const file of readdirSync("./commands").filter(files => files.endsWith(".js"))) {
    try {
      const command = await import(`./commands/${file}`);

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

        if (!allCommands.includes(message.content) || message.author.id == client.user.id) return;
      
        if (command.default.otherOptions?.botOwner) {
          if (isBotOwner(message)) {
            command.default.run(client, message)
          } else {
            message.reply("- You don't have access to this command")
          }
        } else {
          command.default.run(client, message)
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
})();


client.login(process.env.token);