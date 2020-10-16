const EventBase = require("../../base/EventBase");


module.exports = class extends EventBase
{
    constructor(mika)
    {
        super(mika);
    }

    invoke()
    {
        this.mika.logger.info(`${this.mika.user.username} is ready`);
        this.mika.user.setStatus(this.mika.status);
        this.mika.user.setActivity(this.mika.activity);
    }
}