const path = require("path");

const xlsxtojson = require("xlsx-to-json");
const xlstojson = require("xls-to-json");
const { Validator } = require("node-input-validator");

const dbConnection = require("../db");
const scheduleEloquent = require("../eloquents/schedule");
const Schedule = require("../models/schedule");

const init = async () => {
  await dbConnection.open();

  // read file name
  const filePath = path.join(
    __dirname,
    "..",
    "data",
    "filledTemplateSchedule.xlsx" // templateSchedule.xlsx (incorrect file)
  );
  const splitFilePath = filePath.split(".");

  const exceltojson =
    splitFilePath[splitFilePath.length - 1] === "xlsx" ? xlsxtojson : xlstojson;

  exceltojson(
    {
      input: filePath,
      output: null,
      lowerCaseHeaders: true,
    },
    async (err, result) => {
      if (err) {
        console.log("Oops! Something went wrong");
        console.log(err);
        return;
      }

      try {
        if (result.length > 0) {
          const errors = [],
            data = [];

          for (let i = 0; i < result.length; i++) {
            const row = result[i];
            const formattedData = scheduleEloquent.formattedData(row);

            // validate
            const rules = scheduleEloquent.validationRules();
            const messages = scheduleEloquent.validationMessages();

            const v = new Validator(formattedData, rules, messages);

            const matched = await v.check();

            if (!matched) {
              errors.push({
                row: i + 1,
                error: v.errors,
              });
            }

            data.push(formattedData);
          }

          if (errors.length > 0) {
            console.log(JSON.stringify(errors));
          } else {
            try {
              await Schedule.bulkCreate(data);
              console.log("inserted");
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          console.log("No Data Found");
        }
      } catch (error) {
        console.log(error);
      }

      await dbConnection.close();
      process.exit();
    }
  );
};

init();
