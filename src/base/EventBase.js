const Mika = require("../Mika");


module.exports = class EventBase
{
    /**
     * 
     * @param {Mika} mika 
     */
    constructor(mika)
    {
        this.mika = mika;
    }
    async invoke()
    {}
}