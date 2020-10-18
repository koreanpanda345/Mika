const CommandBase = require("../../base/CommandBase");


module.exports = class ShopCommand extends CommandBase
{
    constructor()
    {
        super({
            name: "shop",
            description: "Displays the shop, and the items you can buy",
            category: "Economics",
            usage: "shop",
        });
    }

    async invoke()
    {
        let embed = this.ctx.getDefaultEmbed().setTitle('Shop');
        let allRecords = this.ctx.db.all();
        let items = [];
        allRecords.forEach((record) =>
        {
            if(record.ID.startsWith("shop_item"))
                items.push({data: JSON.parse(record.data)});
        });
        let id = 1;
        console.debug(items);
        items.forEach((item) =>
        {
            embed.addField(`${id}: ${item.data.name}`, `Price: ${item.data.price}\nCategory: ${item.data.category}\nDescription: ${item.data.description}`);
            id++;
        });

        this.ctx.send(embed);
    }
}