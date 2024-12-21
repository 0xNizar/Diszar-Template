import { Client, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { readdirSync } from "fs";

export default async (client: Client) => {
	for (const file of readdirSync("./slashCommands").filter(files => files.endsWith(".js"))) {
		try {
			const slashCommand = await import(`../slashCommands/${file}`);
			const Command = new SlashCommandBuilder()
				.setName(String(slashCommand.default.name).replace(/\s+/g, '_').toLowerCase())
				.setDescription(String(slashCommand.default.description))
				.setNSFW(slashCommand.default.nsfw);

			// Collect all options (attachments and booleans) into one array
			let allOptions = [];

			// TODO: options types
			if (Array.isArray(slashCommand.default.addAttachments)) {
				allOptions.push(
					...slashCommand.default.addAttachments.map((option: any) => ({
						type: 'attachment',
						...option
					}))
				);
			}

			if (Array.isArray(slashCommand.default.addBolean)) {
				allOptions.push(
					...slashCommand.default.addBolean.map((option: any) => ({
						type: 'boolean',
						...option
					}))
				);
			}

			if (Array.isArray(slashCommand.default.addChannel)) {
				allOptions.push(
					...slashCommand.default.addChannel.map((option: any) => ({
						type: 'channel',
						...option
					}))
				);
			}

			if (Array.isArray(slashCommand.default.addMentionable)) {
				allOptions.push(
					...slashCommand.default.addMentionable.map((option: any) => ({
						type: 'mentionable',
						...option
					}))
				);
			}

			if (Array.isArray(slashCommand.default.addRole)) {
				allOptions.push(
					...slashCommand.default.addRole.map((option: any) => ({
						type: 'role',
						...option
					}))
				);
			}

			if (Array.isArray(slashCommand.default.addString)) {
				allOptions.push(
					...slashCommand.default.addString.map((option: any) => ({
						type: 'string',
						...option
					}))
				);
			}

			if (Array.isArray(slashCommand.default.addUser)) {
				allOptions.push(
					...slashCommand.default.addUser.map((option: any) => ({
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

			if (Array.isArray(slashCommand.default.defaultMemberPermission)) {
				const combinedPermissions = slashCommand.default.defaultMemberPermission.reduce(
					(acc: bigint, perm: string) => acc | BigInt(PermissionFlagsBits[perm as keyof typeof PermissionFlagsBits]), // Type assertion
					BigInt(0)
				);
				Command.setDefaultMemberPermissions(combinedPermissions);
			} else if (slashCommand.default.defaultMemberPermission) {
				Command.setDefaultMemberPermissions(BigInt(PermissionFlagsBits[slashCommand.default.defaultMemberPermission as keyof typeof PermissionFlagsBits]));
			} else {
				Command.setDefaultMemberPermissions(null);
			}

			// Register the command
			client.slashCommands.set(slashCommand.default.name, Command.toJSON());
		} catch (e) {
			console.log(`Error loading command ${file}:`, e);
		}
	}
};