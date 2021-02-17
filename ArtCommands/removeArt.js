/*Function to handle the remove art command*/

const ArtSchema = require("../../Schemas/ArtSchema.js");

//removes an art
const removeArtCommand = async (msg) => {
  // Add some cases for mod perms and whatnot
  //   if (   )
  //     return;

  let temp, characterArray, index;

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

  //return if no links were provided
  if (!temp[2]) {
    msg.channel.send("Please provide link").catch(console.error);
    return;
  }

  if (temp[2].includes("?")) {
    temp[2] = temp[2].split("?")[0];
  }

  //finding location of the link
  index = characterArray.findIndex((link) => link === temp[2]);

  //return if no link exists
  if (index == -1) {
    msg.channel.send("No such link exists").catch(console.error);
    return;
  }

  //deleting the link
  characterArray.splice(index, 1);

  //saving changes to the json file
  await ArtSchema.findOneAndUpdate(
    { name: temp[1].toLowerCase() },
    { links: characterArray },
    { useFindAndModify: false }
  );

  //sending back appropriate message and Suppressing embeds from links
  msg.channel
    .send("Removed")
    .then(() => msg.suppressEmbeds())
    .catch(console.error);
};

module.exports = removeArtCommand;
