const { SlashCommandBuilder, Events} = require('discord.js');
const { welcome_db } = require('../db.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('arole')
    .setDescription('Interact on roles.')
    .addSubcommand(subcommand =>
      subcommand.setName("count")
        .setDescription('count the role')
        .addRoleOption(option =>
          option.setName("target")
            .setDescription("Targer role")
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand.setName("list")
        .setDescription('list the roles'))
    .addSubcommand(subcommand =>
      subcommand.setName("welcome")
        .setDescription('set welcome webhook')
        .addRoleOption(option =>
          option.setName("target")
            .setDescription("Targer role")
            .setRequired(true))
        .addStringOption(option =>
          option.setName('webhook')
            .setDescription('webhook url')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('welcome_msg')
            .setDescription('welcome message')
            .setRequired(true)))
  ,
  async execute(interaction) {

    if (interaction.options.getSubcommand() === 'count') {
      await interaction.guild.members.fetch()
      const target_role = interaction.options.getRole('target').name;
      const cache_role = interaction.guild.roles.cache.find(role => role.name === target_role)
      await interaction.reply({ content: `${target_role}: ${cache_role.members.map(m => m.id).length} .`, ephemeral: true });

    } else if (interaction.options.getSubcommand() === 'list') {
      let rolemap = interaction.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",")
      await interaction.reply({ content: `Roles: ${rolemap} .`, ephemeral: true });
    } else if (interaction.options.getSubcommand() === 'welcome') {

      //await interaction.deferReply();
      if (interaction.user.id == "1122813109187383336" || interaction.user.id == "907532318523133954" ||  interaction.user.id == "814548046628126740") {
        const target_role_id = interaction.options.getRole('target').id;
        const target_webhook = interaction.options.getString('webhook');
        const target_welcome_msg = interaction.options.getString('welcome_msg');

        try {
          const welcome_ru = await welcome_db.create({
            role: target_role_id,
            url: target_webhook,
            msg: target_welcome_msg,
          });
          await interaction.reply({ content: `Url added. ${welcome_ru.get('role')}: ${welcome_ru.get('url')}. ${welcome_ru.get('msg')}`, ephemeral: true });
        } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError') {
            await welcome_db.update({ url: target_webhook, msg: target_welcome_msg }, { where: { role: target_role_id } }).then(
              await interaction.reply({ content: `Url updated.`, ephemeral: true })
            )
          }
          return interaction.reply(`Error: ${error.name}`);
        }
      } else {
        interaction.reply("What are you up to? Confess to Iris please :)")
      }

    }
  },
};
