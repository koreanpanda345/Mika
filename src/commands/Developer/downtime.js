const CommandBase = require("../../base/CommandBase");


module.exports = class DownTimeCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "downtime",
            description: "Changes the bot's status, and activity, to indicate downtime. Only Developers and Owners can do this.",
            usage: "downtime",
            category: "Developer",
            enabled: true
        });
    }

    async invoke()
    {
        if(!(this.ctx.owners.includes(this.ctx.user_id) || this.ctx.developers.includes(this.ctx.user_id)))
            return this.ctx.send("Sorry, but you need to be a Developer or Owner to use this.");
        this.ctx.mika.user.setStatus("dnd");
        this.ctx.mika.user.setActivity({name: "I will be will going down in a few to be worked on, or to be updated. Please wait till my status is green.", type: "WATCHING"});
        this.ctx.send("Status Updated.");
    }
}