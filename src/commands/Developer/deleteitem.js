const CommandBase = require("../../base/CommandBase");


module.exports = class DeleteItemCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "deleteitem",
            description: "Deletes an item from the shop. Only Developers and Owners can use this.",
            usage: "deleteitem <item name?",
            category: "Developer",
            enabled: true
        });
    }

    async invoke()
    {
        if(!(this.ctx.owners.includes(this.ctx.user_id) || this.ctx.developers.includes(this.ctx.user_id)))
            return this.ctx.send("Sorry, but you need to be a Developer or Owner to use this command.");
        if(this.ctx.args.length == 0)
            return this.ctx.send("What item did you want to delete?");
        if(!this.ctx.db.has(`shop_item_${this.ctx.args[0]}`))
            return this.ctx.send(`Sorry, but the item ${this.ctx.args[0]} doesnt't seem to exist.`);
        this.ctx.db.delete(`shop_item_${this.ctx.args[0]}`);
        this.ctx.send(`Deleted the item ${this.ctx.args[0]}!`);
    }
}