export default (client) => {
    client.on("error", (error) => {
        console.error("Client Error:", error);
    });

    process.on("unhandledRejection", (reason) => {
        console.error("Unhandled Rejection:", reason);
    });

    process.on("uncaughtException", (error) => {
        console.error("Uncaught Exception:", error);
        process.exit(1);
    });
}