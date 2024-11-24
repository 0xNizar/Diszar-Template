import { SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";

export default async (client) => {
    for (const file of readdirSync("./slash-commands").filter(files => files.endsWith(".js"))) {
        try {
            const slashCommand = await import(`../slash-commands/${file}`);
            const Command = new SlashCommandBuilder()
                .setName(String(slashCommand.default.name).replace(/\s+/g, '_').toLowerCase())
                .setDescription(String(slashCommand.default.description))
                .setNSFW(slashCommand.default.nsfw);

            // Collect all options (attachments and booleans) into one array
            let allOptions = [];

            if (Array.isArray(slashCommand.default.addAttachments)) {
                allOptions.push(
                    ...slashCommand.default.addAttachments.map(option => ({
                        type: 'attachment',
                        ...option
                    }))
                );
            }

            if (Array.isArray(slashCommand.default.addBolean)) {
                allOptions.push(
                    ...slashCommand.default.addBolean.map(option => ({
                        type: 'boolean',
                        ...option
                    }))
                );
            }

			if (Array.isArray(slashCommand.default.addChannel)) {
                allOptions.push(
                    ...slashCommand.default.addChannel.map(option => ({
                        type: 'channel',
                        ...option
                    }))
                );
            }

			if (Array.isArray(slashCommand.default.addMentionable)) {
                allOptions.push(
                    ...slashCommand.default.addMentionable.map(option => ({
                        type: 'mentionable',
                        ...option
                    }))
                );
            }

			if (Array.isArray(slashCommand.default.addRole)) {
                allOptions.push(
                    ...slashCommand.default.addRole.map(option => ({
                        type: 'role',
                        ...option
                    }))
                );
            }

			if (Array.isArray(slashCommand.default.addString)) {
                allOptions.push(
                    ...slashCommand.default.addString.map(option => ({
                        type: 'string',
                        ...option
                    }))
                );
            }

			if (Array.isArray(slashCommand.default.addUser)) {
                allOptions.push(
                    ...slashCommand.default.addUser.map(option => ({
                        type: 'user',
                        ...option
                    }))
                );
            }


            // Sort options: required first
            allOptions.sort((a, b) => b.required - a.required);

            // Add sorted options to the command
            allOptions.forEach(option => {
                switch (option.type) {
                    case 'attachment':
                        Command.addAttachmentOption(opt =>
                            opt
                                .setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;

                    case 'boolean':
                        Command.addBooleanOption(opt =>
                            opt
                                .setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
					case 'channel':
						Command.addChannelOption(opt =>
                            opt
                                .setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
					case 'mentionable':
						Command.addMentionableOption(opt =>
                            opt
                                .setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
					case 'role':
						Command.addRoleOption(opt =>
                            opt
                                .setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
					case 'string':
						Command.addStringOption(opt =>
                            opt
                                .setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
					case 'user':
						Command.addUserOption(opt =>
                            opt
                                .setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                }
            });

            // Register the command
            client.slashCommands.set(slashCommand.default.name, Command.toJSON());
        } catch (e) {
            console.log(`Error loading command ${file}:`, e);
        }
    }
};