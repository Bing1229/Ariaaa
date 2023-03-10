const { sequelize } = require('../db.js');

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await sequelize.sync();
    console.log(`Ready! Logged in as ${client.user.tag}`);
  }
}