'use strict';

const Discord = require('discord.js');
const SpoilerBot = require('@bobbysig/spoilerbot');
const http = require('http');

/* --- Load dotenv --- */
if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}

/* --- Launch SpoilerBot --- */
var spoilerbot = new SpoilerBot(new Discord.Client());
spoilerbot.client.on("ready", function() {
  console.log("SpoilerBot online.");
});
spoilerbot.client.login(process.env.SPOILERBOT_SECRET).catch(function(reason) {
  console.error('Error: Discord login failed. Log:');
  console.error(reason);
});

/* --- Web server that returns status --- */
http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(status()));
  res.end();
}).listen(8080);

/* --- Status Function --- */
function status() {
  let status = {};
  status.UniBot = "ONLINE";
  status.SpoilerBot = discordClientStatus(spoilerbot.client);
  return status;
}

function discordClientStatus(client) {
  switch(client.status) {
    case Discord.Constants.Status.READY:
      return "READY";
    case Discord.Constants.Status.CONNECTING:
      return "CONNECTING";
    case Discord.Constants.Status.RECONNECTING:
      return "RECONNECTING";
    case Discord.Constants.Status.IDLE:
      return "IDLE";
    case Discord.Constants.Status.NEARLY:
      return "NEARLY";
    case Discord.Constants.Status.DISCONNECTED:
      return "DISCONNECTED";
  }
}
