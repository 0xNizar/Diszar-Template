import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load environment variables
dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.token);