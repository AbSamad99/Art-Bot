/*Function to handle the remove art character commands*/

const ArtSchema = require("../../Schemas/ArtSchema.js");

//removes a new character
const removeArtCharacterCommand = async (msg) => {
  // Add some cases for mod perms and whatnot
  //   if (   )
  //     return;

  let temp, characterArtObj;

  //getting params
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

  //deleting the category
  await ArtSchema.findOneAndDelete({ name: temp[1].toLowerCase() });

  //send message
  msg.channel
    .send(`Removed Character ${temp[1].toLowerCase()}`)
    .catch(console.error);
};

module.exports = removeArtCharacterCommand;
