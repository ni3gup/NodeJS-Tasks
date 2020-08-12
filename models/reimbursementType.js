const { DataTypes } = require("sequelize");

const sequelize = require("../db").sequelize;

const ReimbursementTypes = sequelize.define("reimbursement_types", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ReimbursementTypes;
