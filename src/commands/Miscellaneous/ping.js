const CommandBase = require("../../base/CommandBase");

module.exports = class PingCommand extends CommandBase
{
    constructor(ctx)
    {
        super({
            name: "ping",
            aliases: ["latency"],
            description: "Displays the bot's ping",
            category: "Miscellaneous",
            usage: "ping"
        });
    }

    async invoke()
    {
        this.ctx.send(`Pong! Ping ${this.ctx.mika.ws.ping} is ms`);
    }
};