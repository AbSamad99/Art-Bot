//import required libraries
const Discord = require("discord.js");
const dotenv = require("dotenv");
const nodeCache = require("node-cache");

//import the commands object
const commandsObject = require("./commandsObject");

//config the env variables
dotenv.config();

//importing setup functions
const connectDB = require("./Config/DB.js");
const redditSetup = require("./Config/reddit");
const twitSetup = require("./Config/twitter");

//starting up our client
client = new Discord.Client();

//connecting to DB, twitter and reddit and keeping bot alive
connectDB();
const twitterStream = twitSetup();
const redditStream = redditSetup();

//whenever tweet is sent
twitterStream.on("tweet", (tweet) => {
  if (
    tweet.retweeted_status ||
    tweet.in_reply_to_status_id ||
    tweet.in_reply_to_status_id_str ||
    tweet.in_reply_to_user_id ||
    tweet.in_reply_to_user_id_str ||
    tweet.in_reply_to_screen_name
  )
    return;
  const twitterMessage = `${tweet.user.name} (@${tweet.user.screen_name}) tweeted this: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
  client.channels.cache
    .get("put-channel-id-here")
    .send(twitterMessage)
    .catch(console.log);
  return false;
});

//reddit posts
const startupTime = Date.now() / 1000;
redditStream.on("item", (item) => {
  try {
    if (item.created_utc < startupTime) return;
    console.log("New reddit post");
    let description = `**Link to post:-** [Click Here](https://redd.it/${item.id})`;
    const redditEmbed = new Discord.MessageEmbed()
      .setTitle(`**__${item.title}__**`)
      .setFooter(`Author: u/${item.author.name}`);
    if ([".png", ".jpg", ".jpeg"].some((type) => item.url.includes(type))) {
      redditEmbed.setImage(item.url);
    }
    if (item.selftext && item.selftext.length && item.selftext.length <= 2048) {
      redditEmbed.setDescription(`${description}

${"```"}${item.selftext}${"```"}`);
    } else {
      redditEmbed.setDescription(description);
    }
    client.channels.cache
      .get("put-channel-id-here")
      .send(redditEmbed)
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
});

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
