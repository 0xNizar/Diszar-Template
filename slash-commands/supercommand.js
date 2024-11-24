export default {
    name: "supercommand",
    description: 'Here a test command that have everything.',
    nsfw: false,
    addAttachments: [
        { name: "file", description: "Upload a file", required: true },
        { name: "file2", description: "Upload a second file", required: false }
    ],
    addBolean: [
        {name: "boolean", description: "Select a boolean", required: true},
        {name: "boolean2", description: "Select a boolean2", required: false}
    ],
    addChannel: [
        {name: "channel", description: "Select a channel", required: true},
        {name: "channel2", description: "Select a channel2", required: false}
    ],
    addMentionable: [
        {name: "mention", description: "Select a mention", required: true},
        {name: "mention2", description: "Select a mention2", required: false}
    ],
    addRole: [
        {name: "role", description: "Select a role", required: true},
        {name: "role2", description: "Select a role2", required: false}
    ],
    addString: [
        {name: "string", description: "Select a string", required: true},
        {name: "string2", description: "Select a string2", required: false}
    ],
    addUser: [
        {name: "user", description: "Select a user", required: true},
        {name: "user2", description: "Select a user2", required: false}
    ],

    run: async (client, interaction) => {
        
    }
}