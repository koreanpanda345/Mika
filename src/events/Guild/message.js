const { Message, MessageEmbed } = require("discord.js");
const EventBase = require("../../base/EventBase");
const CommandContext = require("../../Context/CommandContext");

module.exports = class extends EventBase
{
    constructor(mika)
    {
        super(mika);
    }

    /**
     * 
     * @param {Message} message 
     */
    async invoke(message)
    {
        if(message.author.bot || message.channel.type === "dm") return;
        if(!this.mika.db.has(`user_${message.author.id}`))
            this.mika.db.set(`user_${message.author.id}`, {xp: 0, level: 1, flowers: 100, birthday: '1/1/2020', description: ""});
        this.mika.db.add(`user_${message.author.id}.xp`, 1);
        let equation = 50 * (Math.pow(this.mika.db.get(`user_${message.author.id}.level`) + 1, 2)) - (50 * (this.mika.db.get(`user_${message.author.id}.level`) + 1));
        if(this.mika.db.get(`user_${message.author.id}.xp`) >= equation)
        {
            this.mika.db.set(`user_${message.author.id}.xp`, 0);
            this.mika.db.add(`user_${message.author.id}.level`, 1);
            this.mika.db.add(`user_${message.author.id}.flowers`, (this.mika.db.get(`user_${message.author.id}.level`) * 100));
            message.channel.send(
                new MessageEmbed()
                .setTitle(`${message.author.username} has leveled up`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`**Level: ${this.mika.db.get(`user_${message.author.id}.level`)}**\nReward: ${(this.mika.db.get(`user_${message.author.id}.level`)) * 100} Flowers`)
                .setColor("RANDOM")
                );
        }

        if(message.content.startsWith(process.env.PREFIX))
        {
            const args = message.content.slice(process.env.PREFIX.length).trim().split(" ");
            const commandName = args.shift().toLowerCase();
            const command = this.mika.commands.get(commandName) || this.mika.commands.find(cmd => cmd.props.aliases && cmd.props.aliases.includes(commandName));
            if(!command) return;

            try
            {
                const ctx = new CommandContext(this.mika, message, args);
                command.setCommandContext(ctx);
                command.invoke();
            }
            catch(error)
            {
                this.mika.logger.error(error);
                console.error(error);
            }
        }
    }
}