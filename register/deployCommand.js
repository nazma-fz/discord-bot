require('dotenv').config();
const commands = require('./register');
const { REST, Routes, Options, ApplicationCommandOptionType, ApplicationCommand } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();