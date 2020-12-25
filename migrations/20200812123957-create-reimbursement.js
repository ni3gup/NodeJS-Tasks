"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reimbursements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reimbursement_type_id: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      from_place: {
        type: Sequelize.STRING,
      },
      to_place: {
        type: Sequelize.STRING,
      },
      purpose: {
        type: Sequelize.STRING,
        values: [
          "market_visit",
          "other_city_travel",
          "office_visit",
          "training",
          "other",
        ],
      },
      other_purpose: {
        type: Sequelize.STRING,
      },
      mode: {
        type: Sequelize.STRING,
        values: ["bike", "bus", "taxi", "train", "auto", "other"],
      },
      other_mode: {
        type: Sequelize.STRING,
      },
      km: {
        type: Sequelize.INTEGER,
      },
      inv_no: {
        type: Sequelize.STRING,
      },
      amt: {
        type: Sequelize.INTEGER,
      },
      attachement: {
        type: Sequelize.STRING,
      },
      from_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      to_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      hotel_name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("reimbursements");
  },
};
