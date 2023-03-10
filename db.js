const Sequelize = require('sequelize');

const sequelize = new Sequelize("sqlite::memory:");

const welcome_db = sequelize.define('welcome_db', {
  role: {
    type: Sequelize.STRING,
    unique: true,
  },
  url: {
    type: Sequelize.STRING,
  },
  msg: {
    type: Sequelize.TEXT,
  }
});
module.exports = {
  sequelize,
  welcome_db,
}