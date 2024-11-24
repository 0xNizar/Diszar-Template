import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import dotenv from 'dotenv';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.slashCommands = new Collection();

// Load environment variables
dotenv.config();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


(async () => {
  for (const file of readdirSync("./handlers").filter(files => files.endsWith(".js"))) {
    const handler = await import(`./handlers/${file}`);
    handler.default(client);
  }

  const rest = new REST({ version: '10' }).setToken(process.env.token);
  setTimeout(async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationCommands(process.env.client_id), { body: client.slashCommands });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.log(error);
    }
  }, 3000);
})()



client.login(process.env.token);