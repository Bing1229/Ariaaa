const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bing')
    .setDescription('Replies with Bong!')
    .addStringOption(option => option.setName('what')
      .setDescription("what to ping")
      .addChoices(
        { name: "head", value: "Bing's head" },
        { name: "toe", value: "Bing's toe" },
      )),
  async execute(interaction) {
    const what_to_ping = interaction.options.getString('what');
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('Click me!')
          .setStyle(ButtonStyle.Primary)
      );
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Some title')
      .setURL('https://discord.js.org')
      .setDescription('Some description here');

    await interaction.reply({ content: 'Bong! ' + what_to_ping, embeds: [embed], components: [row], ephemeral: true });
  },
};