const Mika = require("../Mika");

module.exports = class CommandHandler
{

    /**
     * 
     * @param {Mika} mika 
     */
    constructor(mika)
    {
        this.mika = mika;
    }

    loadCommands(dir)
    {
        const commands = require("fs").readdirSync(`./src/commands/${dir}`).filter(d => d.endsWith(".js"));
        for(let file of commands)
        {
            const command = new(require(`../commands/${dir}/${file}`))(this.mika);
            if(command.props.enabled)
            {
                this.mika.commands.set(command.props.name, command);
                this.mika.logger.info(`Command ${command.props.name} was loaded`);
            }
        }
    }
};