const path = require("path");
const fs = require("fs");

const multer = require("multer");

const xlsxtojson = require("xlsx-to-json");
const xlstojson = require("xls-to-json");
const { Validator } = require("node-input-validator");

const scheduleEloquent = require("../eloquents/schedule");
const Schedule = require("../models/schedule");

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public/uploads/sheets");
  },
  filename: function (req, file, cb) {
    const datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    //file filter
    if (
      ["xlsx", "xls"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
}).single("file");

const process = async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Oops! Something went wrong", status: false });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Invalid File", status: false });
      }

      const exceltojson =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ] === "xlsx"
          ? xlsxtojson
          : xlstojson;

      exceltojson(
        {
          input: req.file.path,
          output: null,
          lowerCaseHeaders: true,
        },
        async (err, result) => {
          if (err) {
            console.log(err);
            fs.unlink(req.file.path, () => {});
            return res
              .status(500)
              .json({ message: "Oops! Something went wrong", status: false });
          }

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
              fs.unlink(req.file.path, () => {});
              return res.status(400).json({ errors });
            } else {
              try {
                Schedule.bulkCreate(data);
                fs.unlink(req.file.path, () => {});
                return res.status(201).json({
                  message: "Data Inserted Successfully",
                });
              } catch (error) {
                return res.status(500).json({
                  message: "Oops! Something went wrong",
                  status: false,
                });
              }
            }
          } else {
            return res
              .status(400)
              .json({ message: "No Data Found", status: false });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Oops! Something went wrong", status: false });
  }
};

module.exports = { process };
