import { Client, CommandInteraction } from 'discord.js';

export default {
    name: "help",
    description: 'Show a help command menu.',
    nsfw: false,

    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.reply({ content: "Here is the help menu!" });
    }
}
