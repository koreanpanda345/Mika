const { Message, MessageEmbed } = require("discord.js");
const Mika = require("./../Mika");

module.exports = class CommandContext
{
    /**
     * @param {Mika} mika
     * @param {Message} message 
     * @param {String[]} args 
     */
    constructor(mika, message, args)
    {
        this.mika = mika;
        this.message = message;
        this.db = mika.db;
        this.args = args;
    }
    send(message)
    {
        this.message.channel.send(message);
    }

    getDefaultEmbed()
    {
        return new MessageEmbed()
            .setColor("RANDOM")
            .setFooter("Mika", this.mika.user.displayAvatarURL());
    }
}