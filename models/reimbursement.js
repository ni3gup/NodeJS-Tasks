const { DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../db").sequelize;

const Reimbursement = sequelize.define("reimbursement", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  reimbursement_type_id: DataTypes.INTEGER,
  date: DataTypes.DATEONLY,
  from_place: DataTypes.STRING,
  to_place: DataTypes.STRING,
  purpose: {
    type: Sequelize.ENUM,
    values: [
      "market_visit",
      "other_city_travel",
      "office_visit",
      "training",
      "other",
    ],
  },
  other_purpose: DataTypes.STRING,
  mode: {
    type: Sequelize.ENUM,
    values: ["bike", "bus", "taxi", "train", "auto", "other"],
  },
  other_mode: DataTypes.STRING,
  km: DataTypes.INTEGER,
  inv_no: DataTypes.STRING,
  amt: DataTypes.INTEGER,
  attachement: DataTypes.STRING,
  from_date: DataTypes.DATEONLY,
  to_date: DataTypes.DATEONLY,
  hotel_name: DataTypes.STRING,
});

module.exports = Reimbursement;
