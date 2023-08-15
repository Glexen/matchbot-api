const { DataTypes } = require("sequelize")
const sequelize = require("./db.js").sequelize
const {languageProfile, UiElements} = require("./languageProfile.js")
const Bot = require("./botSetting.js").bots
const FormField = require("./formField.js")

const User = sequelize.define("user", {
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
  botsId: {
    type: DataTypes.INTEGER,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
  languageProfileId: {
    type: DataTypes.INTEGER,
  },
}, {})

User.belongsTo(languageProfile, { foreignKey: "languageProfileId", as: "languageProfile" })
User.belongsTo(Bot, { foreignKey: "botsId", as: "bot" })

const FormData = sequelize.define("formData", {
  value: {
    type: DataTypes.STRING,
  },
}, {})


FormData.belongsTo(FormField, { foreignKey: "formField_id", as: "formField" })
FormData.belongsTo(User, { foreignKey: "user_id", as: "user" })


module.exports = {User: User, FormData: FormData}
