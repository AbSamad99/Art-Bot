/*Function to handle the get art names command*/

const { MessageEmbed } = require("discord.js");
const { capitalCase } = require("change-case");

const ArtSchema = require("../../Schemas/ArtSchema.js");

const getArtNamesCommand = async (msg) => {
  // Add some cases for mod perms and whatnot
  //   if (   )
  //     return;

  let message, index, characterArtArray, artNamesEmbed, count;

  //getting required object
  characterArtArray = await ArtSchema.find({});

  //constructing the return message
  message = `${capitalCase(characterArtArray[0].name)}: ${
    characterArtArray[0].links.length
  }`;
  count = characterArtArray[0].links.length;

  for (index = 1; index < characterArtArray.length; index++) {
    message = `${message}
${capitalCase(characterArtArray[index].name)}: ${
      characterArtArray[index].links.length
    }`;
    count += characterArtArray[index].links.length;
  }

  artNamesEmbed = new MessageEmbed().setTitle("Art database info")
    .setDescription(`Following is the list of all characters in the database and the number of links each has:
${message}

**Total:** ${count} Links`);

  //sending required data
  msg.channel.send(artNamesEmbed).catch(console.error);
};

module.exports = getArtNamesCommand;
