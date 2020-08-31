require("dotenv").config();
const fetch = require("node-fetch");
const { Webhook } = require("discord-webhook-node");
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const MODE = process.env.MODE;
const hook = new Webhook(WEBHOOK_URL);

function lmao(t, n) {
  switch (t) {
    case "gc":
      return `https://groups.roblox.com/v1/groups/${n}`;
    case "rc":
      return `https://economy.roblox.com/v1/groups/${n}/currency`;
    case "gu":
      return `https://www.roblox.com/Groups/Group.aspx?gid=${n}`;
    default:
      return undefined;
  }
}
async function getgroup() {
  try {
    var randomnum = Math.floor(Math.random() * 9999999) + 1;
    //var group = await superagent.get(lmao("gc", randomnum));
    var group = await fetch(lmao("gc", randomnum));
    group = await group.json();
    //var robux = await superagent.get(lmao("rc", randomnum));
    var robux = await fetch(lmao("rc", randomnum));
    robux = await robux.json();
    var ownerinfo = JSON.parse(group.text).owner;
    if (ownerinfo == null && JSON.parse(group.text).publicEntryAllowed) {
      var outputres = `Groupid: ${randomnum}
Groupurl: ${lmao("gu", randomnum)}
Robux amount: ${JSON.parse(robux.text).robux}
isLocked: ${!JSON.parse(group.text).publicEntryAllowed}`;
      console.log(JSON.parse(group.text));
      hook.success("**Success**", "Ownerless unlocked Group Found", outputres);
    }
  } catch {}
}
var main = async () => {
  console.log("online");
  hook.success("**Success**", "The bot is online", "It's online");
  while (true) {
    await getgroup();
  }
};
console.log("Finished");
main();
