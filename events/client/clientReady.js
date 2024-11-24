export default {
    name: "ready",
    once: true,

    run: async (client) => {
        console.log(`Logged in as ${client.user.tag}!`);
    }
}