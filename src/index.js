require("dotenv").config();
const Mika = require("./Mika");

const mika = new Mika();
const testMode = false;
const init = () => 
{
    ["Client", "Guild"].forEach(x => mika.handlers.event.loadEvents(x));
    ["Miscellaneous", "Profile", "Economics", "Info", "Developer"].forEach(x => mika.handlers.command.loadCommands(x));
    if(!testMode)
        mika.login(process.env.DISCORD_TOKEN);
    else
        mika.login(process.env.TEST_TOKEN);
}

init();