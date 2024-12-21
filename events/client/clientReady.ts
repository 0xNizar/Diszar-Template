import { Client } from 'discord.js';
import { Logging } from "../../functions/logging.js";

const Logger = new Logging();

export default {
    name: "ready",
    once: true,

    run: async (client: Client) => {
        if (!client.user) return;
        
        Logger.success(`Logged in as ${client.user.tag}!`);
    }
}