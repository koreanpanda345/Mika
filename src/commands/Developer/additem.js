const { Message } = require("discord.js");
const CommandBase = require("../../base/CommandBase");


module.exports = class AddItemCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "additem",
            description: "adds an item to the shop. Only Developers and Owners can use this command.",
            usage: "additem <item name>, <price>, <category>, <description>",
            category: "Developer",
            enabled: true
        });
    }

    async invoke()
    {
        if(!(this.ctx.owners.includes(this.ctx.user_id) || this.ctx.developers.includes(this.ctx.user_id)))
            return this.ctx.send("Sorry, but you need to be an owner or developer to use this command.");
        let props = this.ctx.args.join(" ").split(",");
        if(this.ctx.db.get(`shop_item_${props[0]}`)) return this.ctx.send(`Item ${props[0]} already exist`);
        this.ctx.db.set(`shop_item_${props[0]}`, {name: props[0], price: props[1], category: props[2], description: props[3]});
        this.ctx.send(`Made item ${props[0]}`);
    }
}