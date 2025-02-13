const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ledger extends Model {}

Ledger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    debit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    credit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Ledger",
  }
);

module.exports = Ledger;
