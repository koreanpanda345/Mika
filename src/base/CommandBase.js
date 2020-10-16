const CommandContext = require("../Context/CommandContext");


module.exports = class CommandBase
{
    /**
     * 
     * @param {{name: string, aliases: string[], description: string, usage: string, enabled: boolean, category: string}} commandInfo
     */
    constructor({
        name = "",
        aliases = [],
        description = "",
        usage = "",
        enabled = true,
        category = "Miscellaneous",
    })
    {
        this.props = {name, aliases, description, usage, enabled, category};
    }

    /**
     * 
     * @param {CommandContext} ctx 
     */
    setCommandContext(ctx)
    {
        this.ctx = ctx;
    }
}