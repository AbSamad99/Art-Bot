/*Function to handle the get art command*/

const ArtSchema = require("../ArtSchema.js");

//gets an art link
const getArtCommand = async (msg) => {
  // Add some cases for mod perms and whatnot
  //   if (   )
  //     return;

  let temp, characterArray, randomIndex, characterArtObj;

  //getting the name and links
  temp = msg.content.slice(1);
  temp = temp.split(" ");

  //checking the parameters given
  if (!temp[1]) {
    msg.channel.send("Please specify a character name");
    return;
  }

  //getting required object
  characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

  if (!characterArtObj) {
    msg.channel.send("Invalid character");
    return;
  }

  //getting required array
  characterArray = characterArtObj.links;

  //return if no link is stored
  if (!characterArray.length) {
    msg.channel.send("No art added for this character").catch(console.error);
    return;
  }

  //get a random link
  randomIndex = Math.floor(Math.random() * characterArray.length);

  //send back the link
  msg.channel.send(characterArray[randomIndex]).catch(console.error);
};

module.exports = getArtCommand;
