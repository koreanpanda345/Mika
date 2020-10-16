const CommandBase = require("../../base/CommandBase");
const { msToTime } = require("../../utils/time");


module.exports = class DailyCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "daily",
            descritpion: "Allows you to get 500 Flowers once a day.",
            category: "Economics",
            usage: "daily",
        });
    }

    async invoke()
    {
        if(this.ctx.db.has(`daily_${this.ctx.message.author.id}`))
        {
            if(Date.now() < this.ctx.db.get(`daily_${this.ctx.message.author.id}`))
            {
                let time = this.ctx.db.get(`daily_${this.ctx.message.author.id}`) - Date.now();
                return this.ctx.send(`Sorry, but you already claimed you daily today. You need to wait about ${msToTime(time)} more`);
            }
            else if(Date.now() > this.ctx.db.get(`daily_${this.ctx.message.author.id}`))
                this.ctx.db.delete(`daily_${this.ctx.message.author.id}`);
        }
        this.ctx.db.add(`user_${this.ctx.message.author.id}.flowers`, 500);
        this.ctx.db.set(`daily_${this.ctx.message.author.id}`, (Date.now()) + 86400000);

        this.ctx.send(
            this.ctx.getDefaultEmbed()
            .setTitle(`Daily Reward`)
            .setDescription(`You received 250 Flowers ${this.ctx.message.author.username}`)
        );
    }
}