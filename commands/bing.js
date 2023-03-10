const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events, StringSelectMenuBuilder, ModalBuilder, TextInputStyle, TextInputBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bing')
    .setDescription('Replies with Bong!')
    .addSubcommand(subcommand => subcommand.setName("movie")
      .setDescription("To see a movie"))
    .addSubcommand(subcommand => subcommand.setName("dinner")
      .setDescription("To have a dinner"))
    .addSubcommand(subcommand => subcommand.setName("show")
      .setDescription("To see a show")),

  async execute(interaction) {
    const what_to_do = interaction.options.getSubcommand();
    if (what_to_do == "dinner") {
      const act1 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('10$ set!')
            .setStyle(ButtonStyle.Primary)
        );
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Some title')
        .setURL('https://discord.js.org')
        .setDescription('Some description here');

      await interaction.reply({ content: 'Bong! ' + what_to_do, embeds: [embed], components: [act1], ephemeral: true });
      const filter = i => i.customId === 'primary';

      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async i => {
        await i.deferUpdate();
        await wait(4000);
        await i.editReply({ content: 'Wow, sweet :)', components: [act1] });
      });

      collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    } else if (what_to_do == "movie") {

      const row = new ActionRowBuilder()
        .addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('movie_list')
            .setPlaceholder('Nothing selected')
            .addOptions(
              {
                label: 'IMDB 100',
                description: 'TOP 100 movies in IMDB',
                value: 'first_option',
              },
              {
                label: 'DOUBAN 250',
                description: 'Top 250 movies in DOUBAN',
                value: 'second_option',
              },
            ),
        );

      await interaction.reply({ content: 'Pong!', components: [row] });

      const movie_filter = i => i.customId === 'movie_list';

      const movie_collector = interaction.channel.createMessageComponentCollector({ movie_filter, time: 15000 });

      movie_collector.on('collect', async i => {
        await i.deferUpdate();
        await wait(4000);
        await i.editReply({ content: 'Wow, movie selected:)', components: [] });
      });

      movie_collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    } else if (what_to_do == "show") {
      const modal = new ModalBuilder()
        .setCustomId('show_form')
        .setTitle('What\'s your favourite show');

      const showNameInput = new TextInputBuilder()
        .setCustomId('showNameInput')
        // The label is the prompt the user sees for this input
        .setLabel("What's your favorite show?")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

      const showReasonInput = new TextInputBuilder()
        .setCustomId('showReasonInput')
        .setLabel("Do you believe she will like it as you do?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph);



      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder().addComponents(showNameInput);
      const secondActionRow = new ActionRowBuilder().addComponents(showReasonInput);

      // Add inputs to the modal
      modal.addComponents(firstActionRow, secondActionRow);
      await interaction.showModal(modal);

      const show_filter = i => i.customId === 'show_form';

      const show_collector = interaction.channel.createMessageComponentCollector({ show_filter, time: 15000 });

      show_collector.on('modalSubmit', async i => {
        await i.deferUpdate();
        await wait(4000);

        await i.reply({ content: 'Your submission was received successfully!' });
        const movie_name = i.fields.getTextInputValue('showNameInput');
        const movie_reason = i.fields.getTextInputValue('showReasonInput');
        await i.editReply({ content: "Such a " + len(movie_reason) + "reason for " + movie_name, components: [] });
      });
      show_collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    } else {
      console.log("else")
    }
  },
};