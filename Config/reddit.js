const Snoowrap = require("snoowrap");
const { SubmissionStream } = require("snoostorm");

const redditSetup = () => {
  //starting reddit client
  const redditClient = new Snoowrap({
    userAgent: "Put-some-name-here",
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
  });

  const posts = new SubmissionStream(redditClient, {
    subreddit: "JuJutsuKaisen",
    limit: 10,
    pollTime: 10000,
  });

  return posts;
};

module.exports = redditSetup;
