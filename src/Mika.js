const { Client, Collection } = require("discord.js");
const Inscriber = require("@koreanpanda/inscriber");
const CommandHandler = require("./handlers/CommandHandler");
const EventHandler = require("./handlers/EventHandler");
const db = require("quick.db");
const CommandBase = require("./base/CommandBase");
module.exports = class Mika extends Client
{
	constructor(options)
	{
		super(options);
		/**
		 * @type {Collection<string, CommandBase>}
		 */
        this.commands = new Collection();
        this.handlers = {
            command: new CommandHandler(this),
            event: new EventHandler(this)
        };
		this.logger = new Inscriber();
		/**
		 * @type {import("discord.js").PresenceStatusData}
		 */
		this.status = "online";
		/**
		 * @type {import("discord.js").ActivityOptions}
		 */
		this.activity = {name: "", type: "WATCHING"};
		this.db = db;
		this.developers = ["304446682081525772", "366118773507227648", "428185775910420480"];
		this.owners = ["366118773507227648"];
	}
};