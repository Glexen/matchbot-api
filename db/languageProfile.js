const sequelize = require("./db.js").sequelize
const DataTypes = require("./db.js").DataTypes
const bots = require("./botSetting.js").bots
// Model of languageProfile
const languageProfile = sequelize.define(
  "languageProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    botId: {
      type: DataTypes.INTEGER,
      references: {
        model: "bots",
        key: "id",
      },
    }
  },
  {}
)

const UiElements = sequelize.define("uiElements", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  helloMessage: {
    type: DataTypes.TEXT,
  },
  buttonMenu: {
    type: DataTypes.STRING,
  },
  buttonSearch: {
    type: DataTypes.STRING,
  },
  buttonYes: {
    type: DataTypes.STRING,
  },
  buttonNo: {
    type: DataTypes.STRING,
  },
  buttonRestartForm: {
    type: DataTypes.STRING,
  },
  buttonEditForm: {
    type: DataTypes.STRING,
  },
}, {})

UiElements.belongsTo(languageProfile, { foreignKey: "languageProfileId", as: "languageProfile" })
languageProfile.hasOne(UiElements, { foreignKey: "languageProfileId", as: "uiElements" })
languageProfile.belongsTo(bots, { foreignKey: "botId", as: "bot" }) 

module.exports = {languageProfile: languageProfile, UiElements: UiElements}
