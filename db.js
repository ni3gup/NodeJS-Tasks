const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("assignment", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const open = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const close = async () => {
  try {
    await sequelize.close();
    console.log("Connection has been closed successfully.");
  } catch (error) {
    console.error("Unable to close the database connection:", error);
  }
};

module.exports = { open, close, sequelize };
