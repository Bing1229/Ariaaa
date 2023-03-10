const { WebhookClient } = require("discord.js")
const { welcome_db } = require('../db.js');

module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember) {
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

    if (addedRoles.size > 0) {
      //console.log(`The roles ${addedRoles} were added to ${oldMember.displayName}.`);
      const role_id = addedRoles.map(r => r.id);
      try {
        //const role_id = toString(role_id)
        //console.log(`The role ${role_id} were added to ${oldMember.displayName}.`);
        const ru = await welcome_db.findOne({ where: { role: role_id } });
        if (ru) {
          console.log(ru.get("msg"));
          const wc = new WebhookClient({ url: ru.get("url") });

          wc.send(`Hey ${newMember}, ${ru.get("msg")}`);

          //console.log(`sent`);
        } else {
          console.log(`no record for ${role_id}`);
        }

      } catch (error) {
        console.log(`Error: ${error.name}`);
      }

    }
  }
}