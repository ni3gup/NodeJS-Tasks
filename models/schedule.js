const { DataTypes } = require("sequelize");

const sequelize = require("../db").sequelize;

const Schedule = sequelize.define("schedule", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  working_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  store_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  store_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Schedule;
