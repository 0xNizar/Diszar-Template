import { Client, Collection } from 'discord.js';

// Extend the Client type to include slashCommands
declare module 'discord.js' {
    interface Client {
        slashCommands: Collection<string, any>;
        cooldowns: Collection<string, any>;
    }
}
