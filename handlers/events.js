import { readdirSync } from "fs";

export default async (client) => {
    for (const dir of readdirSync("./events")) {
        for (const file of readdirSync(`./events/${dir}`).filter(files => files.endsWith(".js"))) {
            try {
                const eventFiles = await import(`../events/${dir}/${file}`);
                if (eventFiles.default.once) {
                    client.once(eventFiles.default.name, (...args) => {
                        eventFiles.default.run(...args);
                    });
                } else {
                    client.on(eventFiles.default.name, (...args) => {
                        eventFiles.default.run(...args);
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}