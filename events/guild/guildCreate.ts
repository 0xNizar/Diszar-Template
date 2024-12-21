import { Guild } from "discord.js";

export default {
    name: "guildCreate",
    once: false,

    run: async (guild: Guild) => {
        console.log(`Client has been added to: ${guild.name}`);
    }
}