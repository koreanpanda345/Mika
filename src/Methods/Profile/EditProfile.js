const CommandContext = require("../../Context/CommandContext");

/**
 * @param {CommandContext} ctx
 * @param {import("./../../structure/UserDataStructure")} user 
 */
module.exports = async (ctx) => 
{
    let filter = (msg) => msg.author.id === ctx.message.author.id;
    let msg = ctx.message.channel.createMessageCollector(filter, {time: 600000, max: 1});
    ctx.send(ctx.getDefaultEmbed().setTitle("Fields you can edit").setDescription('`birthday`\n`description`'));
    msg.on("collect", async (content) => 
    {
        switch(content.content)
        {
            case "birthday":
                let birthday = ctx.message.channel.createMessageCollector(filter, {time: 600000, max: 1});
                ctx.send("When is your birthday?");
                birthday.on("collect", async (birth) => 
                {
                    let date = new Date(birth.content).toDateString();

                    ctx.db.set(`user_${ctx.message.author.id}.birthday`, date);
                    ctx.send(`Your birthday has been set to ${date}`);
                })
            break;
            case "description":
                let description = ctx.message.channel.createMessageCollector(filter, {time: 600000, max: 1});
                ctx.send("What would you like to have your description to be? Max Length is 2048 Characters!");
                description.on("collect", async (text) => 
                {
                    if(text.content.length > 2048) return ctx.send(`Sorry, but the description you want is ${text.content.length - 2048} characters too long. Exitting editting process.`);
                    // if(typeof(date) !== "number") return ctx.send(`Sorry, but that is not a valid date. exitting editing process.`);
                    ctx.db.set(`user_${ctx.message.author.id}.description`, text.content);
                    ctx.send(`Your description is now \`${text.content}\``);
                })
            break;
            case "level":
                return ctx.send("Sorry, but that field can't be edited.");
            case "xp":
                return ctx.send("Sorry, but that field can't be edited.");
            case "flowers":
                return ctx.send("Sorry, but that field can't be edited.");
            default:
                return ctx.send("Sorry, but that field doesn't exist.");
        }
    })
}