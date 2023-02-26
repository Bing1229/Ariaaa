const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('arole')
		.setDescription('Provides information about the role.')
    .addSubcommand(subcommand =>
      subcommand.setName("count")
                  .setDescription('count the role')
                  .addRoleOption(option =>
    option.setName("target")
          .setDescription("Targer role")
          .setRequired(true)))
  .addSubcommand(subcommand =>
      subcommand.setName("list")
                  .setDescription('list the  role'))
  ,
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
    if (interaction.options.getSubcommand() === 'count') {
      const targetRole = interaction.options.get('target');
		await interaction.reply({content: `Arole command choose ${targetRole.role}.`, ephemeral: true});
    }else if (interaction.options.getSubcommand() === 'list'){
      await interaction.reply({content: `Arole command was run by ${interaction.guild.memberCount}.`, ephemeral: true})
    }
	},
};