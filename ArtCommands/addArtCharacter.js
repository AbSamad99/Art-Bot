/*Function to handle the add art character command*/

const ArtSchema = require("../ArtSchema");

//adds a character
const addArtCharacterCommand = async (msg) => {
  // Add some cases for mod perms and whatnot
  //   if (  )
  //     return;

  let temp, characterArtObj;
  //getting params
  temp = msg.content.slice(1);
  temp = temp.split(" ");

  if (!temp[1]) {
    msg.channel.send("Please specify a character name").catch(console.error);
    return;
  }

  //getting required object
  characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

  //checking the parameters given
  if (characterArtObj) {
    msg.channel.send("Character already exists").catch(console.error);
    return;
  }

  //adding the new category
  await ArtSchema.create({ name: temp[1].toLowerCase(), links: [] });

  //sending appropriate message
  msg.channel
    .send(`Added Character ${temp[1].toLowerCase()}`)
    .catch(console.error);
};

module.exports = addArtCharacterCommand;
