const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/tbProject"
)

try {
  sequelize.authenticate()
  console.log("Connection has been established successfully.")
} catch (error) {
  console.error("Unable to connect to the database:", error)
}

module.exports = { sequelize: sequelize, DataTypes: DataTypes }
