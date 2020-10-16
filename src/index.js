require("dotenv").config();
const Mika = require("./Mika");

const mika = new Mika();

const init = () => 
{
    ["Client", "Guild"].forEach(x => mika.handlers.event.loadEvents(x));
    ["Miscellaneous", "Profile", "Economics", "Info", "Developer"].forEach(x => mika.handlers.command.loadCommands(x));
    mika.login(process.env.DISCORD_TOKEN);
}

init();