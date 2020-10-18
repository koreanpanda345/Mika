const CommandBase = require("../../base/CommandBase");


module.exports = class EditItemCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "edititem",
            description: "Edits an item in the shop. Only Developers and Owners can use this.",
            usage: "edititem <item name>, <field>, <value>",
            category: "Developer",
            enabled: true,
        });
    }

    async invoke()
    {
        if(!(this.ctx.owners.includes(this.ctx.user_id) || this.ctx.developers.includes(this.ctx.user_id)))
            return this.ctx.send("Sorry, but you need to be a Developer or Owner to use this command.");
        let args = this.ctx.args.join(" ").split(",");
        if(!args.length) return this.ctx.send(`Please try the command again, but add the item's name, the field's name, and the value.`);
        if(!this.ctx.db.has(`shop_item_${args[0]}`))
            return this.ctx.send(`Sorry, but ${args[0]} doesn't seem to exist.`);
        if(!this.ctx.db.get(`shop_item_${args[0]}.${args[1]}`) == (null || undefined))
            return this.ctx.send(`Sorry, but that field doesn't seem to exist.`);
        let item = this.ctx.db.get(`shop_item_${args[0]}`);
        item[args[1].trim()] = isNaN(args[2]) ? args[2] : Number(args[2]);
        this.ctx.db.set(`shop_item_${args[0]}`, item);
        
        this.ctx.send(`Edited ${args[1]} field for ${args[0]} item. Value: ${args[2]}`);
    }
}