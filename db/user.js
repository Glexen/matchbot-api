const sequelize = require("./db.js").sequelize
const DataTypes = require("./db.js").DataTypes
const languageProfile = require("./languageProfile.js")

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    telegramId: {
      type: DataTypes.STRING,
      unique: true,
    },
    form: {
      type: DataTypes.JSON,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    languageProfileId: {
      type: DataTypes.INTEGER,
    },
  },
  {}
)

user.belongsTo(languageProfile)

languageProfile.hasMany(user)

module.exports = user
