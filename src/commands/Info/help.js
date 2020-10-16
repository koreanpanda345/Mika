const CommandBase = require("../../base/CommandBase");


module.exports = class HelpCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "help",
            aliases: ["command", "commands"],
            description: "Shows a list of commands, or info about a specific command.",
            usage: "help (command name)",
            category: "Info"
        });
    }

    async invoke()
    {
        if(!this.ctx.args[0])
        {
            let embed = this.ctx.getDefaultEmbed();
            embed.setTitle(`${this.ctx.message.guild.me.displayName}'s Help Command!`);
            embed.setDescription(`Prefix: ${process.env.PREFIX}`);
            let categories = require("fs").readdirSync(`./src/commands`);
            categories.forEach(category => {
                let commands = this.ctx.mika.commands.filter(cmd => cmd.props.category === category);
                let arr = commands.array();
                let str = "";
                arr.forEach(item => 
                {
                    str += `\`${item.props.name}\`\n`;
                })
                embed.addField(`**${category}** > [${commands.size}]:`, commands.size == 0 ? '\u200b' : str);
            });

            this.ctx.send(embed);
        }
        else
        {
            let command = this.ctx.mika.commands.get(this.ctx.args[0].toLowerCase()) 
            || this.ctx.mika.commands.find(cmd => cmd.props.aliases && cmd.props.aliases.includes(this.ctx.args[0].toLowerCase()));
            
            if(!command) return this.ctx.send(`Sorry, but I can't find command called ${this.ctx.args[0]}`);

            let embed = this.ctx.getDefaultEmbed();
            embed.setTitle(`Info on ${command.props.name}`);
            embed.setDescription(`Description: ${command.props.description}`);
            embed.addField(`Category: `, command.props.category, true);
            embed.addField(`Aliases: `, `${command.props.aliases.length == 0 ? '\u200b' : command.props.aliases.join(", ")}`, true);
            embed.addField(`Usage:`, command.props.usage == '' ? '\u200b' : command.props.usage, true);
            
            this.ctx.send(embed);
        }
    }
}