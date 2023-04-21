const sequelize = require("./db.js").sequelize;
const DataTypes = require("./db.js").DataTypes;
const languageProfile = require("./languageProfile.js");

// model of FormField
const formField = sequelize.define(
  "formField",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
    },
    isOptional: {
      type: DataTypes.BOOLEAN,
    },
    nameField: {
      type: DataTypes.STRING,
    },
    languageProfileId: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "text",
    },
  },
  {}
);

formField.belongsTo(languageProfile);

languageProfile.hasMany(formField);

module.exports = formField;
