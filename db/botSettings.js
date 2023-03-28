const sequelize = require('./db.js').sequelize;
const DataTypes = require('./db.js').DataTypes;

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
}, {

})

// botSettings.sync()
module.exports = botSettings