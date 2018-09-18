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
  status = discordClientStatus(status, spoilerbot.client);
  return status;
}

function discordClientStatus(status, client) {
  switch(client.status) {
    case Discord.Constants.Status.READY:
      status.SpoilerBot = "READY"
      break;
    case Discord.Constants.Status.CONNECTING:
      status.SpoilerBot = "CONNECTING"
      break;
    case Discord.Constants.Status.RECONNECTING:
      status.SpoilerBot = "RECONNECTING"
      break;
    case Discord.Constants.Status.IDLE:
      status.SpoilerBot = "IDLE"
      break;
    case Discord.Constants.Status.NEARLY:
      status.SpoilerBot = "NEARLY"
      break;
    case Discord.Constants.Status.DISCONNECTED:
      status.SpoilerBot = "DISCONNECTED"
      break;
  }
  return status;
}
