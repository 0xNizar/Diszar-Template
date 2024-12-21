import { Guild } from "discord.js";

export default {
    name: "guildDelete",
    once: false,
    
    run: async (guild: Guild) => {
        console.log(`Client has been removed from: ${guild.name}`)
    }
}