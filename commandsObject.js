//all art commands
const addArtCharacterCommand = require("./ArtCommands/addArtCharacter.js");
const addArtCommand = require("./ArtCommands/addArt.js");
const editArtCharacterCommand = require("./ArtCommands/editArtCharacter.js");
const getArtNamesCommand = require("./ArtCommands/getArtNames.js");
const getArtCommand = require("./ArtCommands/getArt.js");
const removeArtCharacterCommand = require("./ArtCommands/removeArtCharacter.js");
const removeArtCommand = require("./ArtCommands/removeArt.js");

module.exports = {
  addart: addArtCommand,
  addartchar: addArtCharacterCommand,
  editartchar: editArtCharacterCommand,
  getartnames: getArtNamesCommand,
  getart: getArtCommand,
  remartchar: removeArtCharacterCommand,
  remart: removeArtCommand,
};
