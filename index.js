'use strict';

require('dotenv').load();
const Discord = require('discord.js');
const SpoilerBot = require('discord-spoilerbot');

/* --- Launch SpoilerBot --- */
var client = new Discord.Client();
client.on("ready", function() {
  console.log("SpoilerBot online.");
});
var bot = new SpoilerBot(client);
client.login(process.env.SPOILERBOT_SECRET).catch(function(reason) {
  console.error('Error: Discord login failed. Log:');
  console.error(reason);
});
