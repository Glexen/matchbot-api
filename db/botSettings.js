const sequelize = require('./db.js').sequelize;
const DataTypes = require('./db.js').DataTypes;
// model of BotSettings
const botSettings = sequelize.define('botSettings', {
id:{
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
},
botToken:{
    type: DataTypes.STRING,
},
emojies:{
    type: DataTypes.JSON,
}
}, {})
module.exports = botSettings