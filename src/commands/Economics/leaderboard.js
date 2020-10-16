const { Message, MessageEmbed } = require("discord.js");
const CommandBase = require("../../base/CommandBase");


module.exports = class LeaderboardCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "leaderboard",
            aliases: ["lb"],
            description: "Displays the leaderboard for either level, or flowers.",
            usage: "leaderboard (level | flowers)",
            category: "Economics",
            enabled: true
        });
    }

    async invoke()
    {
        let data = this.ctx.db.all();
        /**
         * @type {[{ID: string, data: any}]}
         */
        let users = [];
        data.forEach(item => 
        {
            if(item.ID.startsWith("user_")) users.push(item);
        });
        let lb = users.sort((a, b) => a.data.level - b.data.level);
        let top = lb.slice(0, lb.length < 9 ? lb.length : 9);
        let embed = this.ctx.getDefaultEmbed()
        .setTitle("Leaderboard")
        .setDescription("only Levels are avaible");
        for(let i = 0; i < top.length; i++)
        {
            embed.addField(`__**${i + 1}${i == 0 ? "st" : i == 1 ? "nd" : i == 2 ? "rd": "th"} Place**__`, `${(await this.ctx.mika.users.fetch(top[i].ID.split("user_")[1])).tag} - Level: ${top[i].data.level}`);
        }

        this.ctx.send(embed);
    }
}