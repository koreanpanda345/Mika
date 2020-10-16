const CommandBase = require("../../base/CommandBase");


module.exports = class VoteCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "vote",
            description: "Vote someone, and receive flowers.",
            usage: "vote <@who>",
            category: "Profile",
            enabled: true
        });
    }

    async invoke()
    {
        if(this.ctx.db.has(`vote_${this.ctx.message.author.id}`))
        {
            if(Date.now() < this.ctx.db.get(`vote_${this.ctx.message.author.id}`))
            {
                let time = this.ctx.db.get(`vote_${this.ctx.message.author.id}`) - Date.now();
                return this.ctx.send(`Sorry, but you already used your vote. You need to wait about ${msToTime(time)} till you can vote again.`);
            }
            else if(Date.now() > this.ctx.db.get(`vote_${this.ctx.message.author.id}`))
                this.ctx.db.delete(`vote_${this.ctx.message.author.id}`);
        }
        if(this.ctx.message.mentions.users.size == 0)
            return this.ctx.send(`Sorry, but who are you using your vote on?`);
        if(this.ctx.message.mentions.users.first().id === this.ctx.message.author.id)
            return this.ctx.send(`Sorry, but you can't vote yourself!`);
        if(this.ctx.message.mentions.users.first().bot)
            return this.ctx.send(`Sorry, but you can't vote a bot!`);
        this.ctx.db.add(`user_${this.ctx.message.mentions.users.first().id}.votes`, 1);
        this.ctx.db.add(`user_${this.ctx.message.author.id}.flowers`, 250);
        this.ctx.send(
            this.ctx.getDefaultEmbed()
                .setTitle(`${this.ctx.message.member.displayName} voted ${this.ctx.message.mentions.members.first().displayName}`)
                .setDescription(`${this.ctx.message.member.displayName} received 250 flowers for voting.\n${this.ctx.message.mentions.members.first().displayName} gain a vote.`)
            );

        this.ctx.db.set(`vote_${this.ctx.message.author.id}`, (Date.now + 43200000));
    }
}