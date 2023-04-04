const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

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
