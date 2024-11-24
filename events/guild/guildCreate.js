export default {
    name: "guildCreate",
    once: false,

    run: async (guild) => {
        console.log(`Client has been added to: ${guild.name}`);
    }
}