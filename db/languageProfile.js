const sequelize = require('./db.js').sequelize;
const DataTypes = require('./db.js').DataTypes;

const languageProfile = sequelize.define('languageProfile', {
id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true,
},
name:{
    type: DataTypes.STRING,
    unique: true,
},
helloMessage:{
    type: DataTypes.TEXT,
},
buttonNames:{
    type: DataTypes.JSON,
}

}, {

})
// languageProfile.sync()
module.exports = languageProfile