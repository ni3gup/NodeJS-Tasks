"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("reimbursement_types", [
      {
        name: "conveyance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "hotel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "food",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "mobile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "internet",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "other",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("reimbursement_types", null, {});
  },
};
