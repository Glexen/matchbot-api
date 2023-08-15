const sequelize = require("./db.js").sequelize
const DataTypes = require("./db.js").DataTypes

const interactions = sequelize.define("interactions", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  like: {
    type: DataTypes.STRING,
  },
  dislike: {
    type: DataTypes.STRING,
  },
  likeMessage: {
    type: DataTypes.STRING,
  },
  report: {
    type: DataTypes.STRING,
  },
})

const bots = sequelize.define(
  "bots",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    botToken: {
      type: DataTypes.STRING,
    },
    interactionsId: {
      type: DataTypes.INTEGER,
    },
  },
  {}
)

interactions.hasOne(bots, { foreignKey: "interactionsId" })
bots.belongsTo(interactions, { foreignKey: "interactionsId" })

module.exports = { bots: bots, interactions: interactions }
