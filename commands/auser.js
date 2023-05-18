const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('auser')
    .setDescription('Interact on user.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('rolecountover')
        .setDescription('Extract users with roles more than')
        .addIntegerOption(option =>
          option
            .setName('threshold')
            .setDescription('Threshold number of roles')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const threshold = interaction.options.getInteger('threshold');
    await interaction.guild.members.fetch()
    const guildMembers = interaction.guild.members.cache;
const filteredMembers = guildMembers.filter(member => member.roles.cache.size > threshold);
    const usernames = filteredMembers.map(member => member.user.username);
    const response = usernames.join('\n ');
    //console.log(response);
    await interaction.reply({ content: `具有 ${threshold} 个以上身份组的成员：\n${response}`, ephemeral: true });
  },
};
