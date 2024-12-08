import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Ensure required environment variables are set
const { token, client_id } = process.env;
if (!token || !client_id) {
  console.error("Missing required environment variables: 'token' or 'client_id'.");
  process.exit(1);
}

// Initialize the Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.slashCommands = new Collection();
client.cooldowns = new Collection();

/**
 * Dynamically load handlers from the 'handlers' directory.
 */
const loadHandlers = async () => {
  const handlerFiles = readdirSync("./handlers").filter((file) => file.endsWith(".js"));
  for (const file of handlerFiles) {
    try {
      const handler = await import(`./handlers/${file}`);
      if (typeof handler.default === "function") {
        handler.default(client);
      } else {
        console.warn(`Handler '${file}' does not export a default function.`);
      }
    } catch (error) {
      console.error(`Failed to load handler '${file}':`, error);
    }
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Register slash commands with Discord's API.
 */
const registerSlashCommands = async () => {
  const rest = new REST({ version: "10" }).setToken(token);
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(client_id), { body: client.slashCommands });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Failed to register slash commands:", error);
  }
};

// Main function
(async () => {
  try {
    await loadHandlers();
    console.log("Client Is Loading...")
    await delay(5000);
    await registerSlashCommands();
    await client.login(token);
  } catch (error) {
    console.error("Error during client startup:", error);
    process.exit(1);
  }
})();