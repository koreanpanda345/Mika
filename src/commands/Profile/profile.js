const CommandBase = require("../../base/CommandBase");
const EditProfile = require("../../Methods/Profile/EditProfile");


module.exports = class ProfileCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "profile",
            description: "Displays your profile or lets you to edit it.",
            usage: "profile (edit)",
            category: "Profile",
            enabled: true
        });
    }

    async invoke()
    {
        if(!this.ctx.args[0])
        {
            let embed = this.ctx.getDefaultEmbed();

            let user = this.ctx.db.get(`user_${this.ctx.message.author.id}`);
            embed.setTitle(`${this.ctx.message.author.username}'s Profile`);
            embed.setDescription(`Birthday: ${user.birthday}\n${user.description === undefined ? "" : user.description}`);
            embed.setThumbnail(this.ctx.message.author.displayAvatarURL());
            let equation = 50 * (Math.pow(user.level + 1, 2)) - (50 * (user.level + 1));
            embed.addFields([
                {
                    name: "Level",
                    value: user.level,
                    inline: true
                },
                {
                    name: "Xp",
                    value: `${user.xp}/${equation}`,
                    inline: true
                },
                {
                    name: "Flowers",
                    value: user.flowers,
                    inline: true
                },
                {
                    name: 'Votes',
                    value: user.votes == undefined ? 0 : user.votes,
                    inline: true
                }
            ]);
    
            this.ctx.send(embed);
        }
        else 
        {
            let user = this.ctx.db.get(`user_${this.ctx.message.author.id}`);
            switch(this.ctx.args[0])
            {
                case "edit":
                    await EditProfile(this.ctx);
                break;
                default:
                    if(this.ctx.message.mentions.users.size !== 0)
                    {
                        if(!this.ctx.db.has(`user_${this.ctx.message.mentions.users.first().id}`))
                            this.ctx.db.set(`user${this.ctx.message.mentions.users.first().id}`, {xp: 0, level: 1, flowers: 100, birthday: '1/1/2020', description: ''});
                        embed.setTitle(`${this.ctx.message.mentions.users.first().username}'s Profile`);
                        embed.setDescription(`Birthday: ${_user.birthday}\n${_user.description === undefined ? "" : user.description}`);
                        embed.setThumbnail(this.ctx.message.mentions.users.first().displayAvatarURL());
                        let equation = 50 * (Math.pow(_user.level + 1, 2)) - (50 * (_user.level + 1));
                        embed.addFields([
                            {
                                name: "Level",
                                value: _user.level,
                                inline: true
                            },
                            {
                                name: "Xp",
                                value: `${_user.xp}/${equation}`,
                                inline: true
                            },
                            {
                                name: "Flowers",
                                value: _user.flowers,
                                inline: true
                            },
                            {
                                name: 'Votes',
                                value: user.votes == undefined ? 0 : user.votes,
                                inline: true
                            }
                        ]);
    
                        this.ctx.send(embed);
                    }
            }
        }
    }
}