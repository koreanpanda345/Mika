const Mika = require("../Mika");


module.exports = class EventHandler
{
    /**
     * 
     * @param {Mika} mika 
     */
    constructor(mika)
    {   
        this.mika = mika;
    }

    loadEvents(dir)
    {
        const events = require("fs").readdirSync(`./src/events/${dir}`).filter(d => d.endsWith(".js"));
        for(let file of events)
        {
            const eName = file.split(".")[0];
            const evt = new(require(`../events/${dir}/${file}`))(this.mika);
            this.mika.on(eName, (...args) => evt.invoke(...args));
            this.mika.logger.info(`Event ${eName} was loaded.`);
            
        }
    }
}