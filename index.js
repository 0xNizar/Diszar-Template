import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load environment variables
dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.token);