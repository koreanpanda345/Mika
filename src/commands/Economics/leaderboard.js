const { Message, MessageEmbed } = require("discord.js");
const CommandBase = require("../../base/CommandBase");


module.exports = class LeaderboardCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "leaderboard",
            aliases: ["lb"],
            description: "Displays the leaderboard for either level, votes, or flowers.",
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
        switch(this.ctx.args[0])
        {
            case "levels":


                data.forEach(item => 
                {
                    if(item.ID.startsWith("user_")) users.push(item);
                });
                let lb = users.sort((a, b) => b.data.level - a.data.level);
                let top = lb.slice(0, lb.length < 9 ? lb.length : 9);
                let embed = this.ctx.getDefaultEmbed()
                .setTitle("Leaderboard")
                .setDescription("only Levels are avaible");
                for(let i = 0; i < top.length; i++)
                {
                    embed.addField(`__**${i + 1}${i == 0 ? "st" : i == 1 ? "nd" : i == 2 ? "rd": "th"} Place**__`, `${(await this.ctx.mika.users.fetch(top[i].ID.split("user_")[1])).tag} - Level: ${top[i].data.level}`);
                }

                this.ctx.send(embed);
            break;
            case "votes":
                data.forEach(item => 
                {
                    if(item.ID.startsWith("user_")) users.push(item);
                });
                let _lb = users.sort((a, b) => (b.data.votes == undefined ? 0 : b.data.votes) - a.data.votes == undefined ? 0 : a.data.votes);
                let _top = _lb.slice(0, _lb.length < 9 ? _lb.length : 9);
                let _embed = this.ctx.getDefaultEmbed()
                .setTitle("Leaderboard")
                .setDescription("only Levels are avaible");
                for(let i = 0; i < _top.length; i++)
                {
                    _embed.addField(`__**${i + 1}${i == 0 ? "st" : i == 1 ? "nd" : i == 2 ? "rd": "th"} Place**__`, `${(await this.ctx.mika.users.fetch(_top[i].ID.split("user_")[1])).tag} - Votes: ${_top[i].data.votes == undefined ? 0 : _top[i].data.votes}`);
                }

                this.ctx.send(_embed);
            break;
            case "flowers":
                data.forEach(item => 
                {
                    if(item.ID.startsWith("user_")) users.push(item);
                });
                let __lb = users.sort((a, b) => b.data.flowers - a.data.flowers);
                let __top = __lb.slice(0, __lb.length < 9 ? __lb.length : 9);
                let __embed = this.ctx.getDefaultEmbed()
                .setTitle("Leaderboard")
                .setDescription("only Levels are avaible");
                for(let i = 0; i < __top.length; i++)
                {
                    __embed.addField(`__**${i + 1}${i == 0 ? "st" : i == 1 ? "nd" : i == 2 ? "rd": "th"} Place**__`, `${(await this.ctx.mika.users.fetch(__top[i].ID.split("user_")[1])).tag} - Flowers: ${__top[i].data.flowers}`);
                }

                this.ctx.send(__embed);
            break;
            default:
                return this.ctx.send("Please execute the command again, but provide what leaderboard you would like to look at.\n`levels`\n`votes`\n`flowers`");
        }
    }
}