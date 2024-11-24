export default {
    name: "guildDelete",
    once: false,
    
    run: async (guild) => {
        console.log(`Client has been removed from: ${guild.name}`)
    }
}