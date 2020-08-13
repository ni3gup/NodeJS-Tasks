const { DataTypes, models } = require("sequelize");

const sequelize = require("../db").sequelize;

const ReimbursementType = sequelize.define("reimbursement_types", {
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

ReimbursementType.associate = function (models) {
  ReimbursementType.hasMany(models.Reimbursement, { as: "reimbursement" });
};

module.exports = ReimbursementType;
