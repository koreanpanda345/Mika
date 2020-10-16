const CommandBase = require("../../base/CommandBase");


module.exports = class AFKCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "afk",
            description: "Puts a AFK status on you",
            usage: "afk (Reason)",
            category: "Miscellaneous",
            enabled: true
        });
    }

    async invoke()
    {
        if(this.ctx.db.has(`afk_${this.ctx.message.author.id}`))
        {
            this.ctx.db.delete(`afk_${this.ctx.message.author.id}`)
            return this.ctx.send(`Ok, I removed your afk status!`);
        }

        let reason = "";
        if(this.ctx.args.length > 0) reason = this.ctx.args.join(" ");
        this.ctx.db.set(`afk_${this.ctx.message.author.id}`, {
            reason: reason,
            pings: [],
            sinceAfk: Date.now()
        });

        this.ctx.message.member.setNickname(`[AFK] ${this.ctx.message.member.displayName}`);
        this.ctx.send(this.ctx.getDefaultEmbed().setTitle(`Ok I put you on AFK!`).setDescription(`reason: ${reason}`));
    }
}