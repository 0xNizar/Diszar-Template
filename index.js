import { Client, GatewayIntentBits } from 'discord.js';
import { readdirSync } from "fs"
import dotenv from 'dotenv';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Load environment variables
dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

(async () => {
  for (const file of readdirSync("./handlers").filter(files => files.endsWith(".js"))) {
    const handler = await import(`./handlers/${file}`);
    handler.default(client);
  }
})()

client.login(process.env.token);