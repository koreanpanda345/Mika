const CommandBase = require("../../base/CommandBase");
const CommandContext = require("../../Context/CommandContext");


module.exports = class DbCommand extends CommandBase
{
    /**
     * @private
     */
    messagesToDelete = [];
    constructor()
    {
        super({
            name: "db",
            description: "Only Developers and Owners Can use this command. This is to interact with the database.",
            usage: "db",
            category: "Developer",
            enabled: false
        });
    }
    async invoke()
    {
        if(!(this.ctx.mika.owners.includes(this.ctx.message.author.id) || this.ctx.mika.developers.includes(this.ctx.message.author.id)))
            return this.ctx.send(`Sorry, but you are not a developer, or an owner.`);
        let embed = this.ctx.getDefaultEmbed();
        embed.setTitle('Db');
        embed.setDescription("What would you like to do?\n`get`\n`delete`\n`set`\n`exit`");

        this.ctx.send(embed);
        
        let filter = (msg) => msg.author.id == this.ctx.message.author.id;
        let action = this.ctx.message.channel.createMessageCollector(filter, {time: 8640000});
        action.on('collect', (collected) => 
        {
            this.messagesToDelete.push(collected.id);
            switch(collected.content)
            {
                case "get":
                this.getMethod();
                action.dispose();
            }
        });
        action.on('dispose', async () => {
            // await this.deleteMessages();
        })
    }
    /**
     * @private
     */
    getMethod()
    {
        this.ctx.send("What is the query?");
        let filter = (msg) => msg.author.id == this.ctx.message.author.id;
        let query = this.ctx.message.channel.createMessageCollector(filter, {
            time: 8640000
        });

        query.on("collect", (collected) => 
        {
            this.messagesToDelete.push(collected.id);
            let _query = collected.content;
            if(_query.toString() != "exit")
            {
                this.ctx.message.channel.send(JSON.stringify(this.ctx.db.get(_query)), {code: true});
            }
            else
            {
                this.ctx.send("exitted");
                query.stop();
            }
        })
    }
    /**
     * @private
     */
    async deleteMessages()
    {
        this.messagesToDelete.forEach(async message => 
        {
            await this.ctx.message.channel.messages.delete(message);
        })

    }
}