const Twitter = require("twit");

const twitSetup = () => {
  //starting up our client
  const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  // Create a stream to follow tweets
  const stream = twitterClient.stream("statuses/filter", {
    follow:
      // Array of ID's of all the accounts you want the bot to keep an eye on
      [
        "906019647132098560",
        "1123756683149348866",
        "1181863232228610048",
        "1059457329710526465",
      ],
  });

  return stream;
};

module.exports = twitSetup;
