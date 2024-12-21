import { Client, CommandInteraction } from 'discord.js';

export default {
    name: "ping",
    description: 'Show bot latency.',
    nsfw: false,

    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.reply({ content: "Pong!" });
    }
}
