const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bing')
    .setDescription('Replies with Bong!'),
  async execute(interaction) {
    await interaction.reply({ content: 'Bong!', ephemeral: true });
  },
};