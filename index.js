//import required libraries
const Discord = require("discord.js");
const dotenv = require("dotenv");
const nodeCache = require("node-cache");

//import the commands object
const commandsObject = require("./commandsObject");

//config the env variables
dotenv.config();

//importing setup functions
const connectDB = require("./DB.js");

//starting up our client
client = new Discord.Client();

//connecting to DB, twitter and reddit and keeping bot alive
connectDB();
keepAlive();

//when client is ready
client.on("ready", () => {
  console.log("Bot is up");
});

//all message cases
client.on("message", (msg) => {
  let temp = msg.content.toLowerCase();
  //checks from command
  if (temp.startsWith("-")) {
    let keyword = temp.slice(1);
    keyword = keyword.split(" ");
    keyword = keyword[0];

    let requiredCommand = commandsObject[keyword];

    if (requiredCommand) {
      if (requiredCommand.constructor.name === "AsyncFunction")
        requiredCommand(msg).catch(console.log);
      else requiredCommand(msg);
    }
  }
});

client.login(process.env.token);
