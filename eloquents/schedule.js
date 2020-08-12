const moment = require("moment");

const formattedData = (object) => {
  const newObj = {};

  for (let key in object) {
    const newKey = key.replace(/ +/g, "_");

    if (newKey === "date") {
      newObj[newKey] = moment(object[key]).format("YYYY-MM-DD");
    } else {
      newObj[newKey] = object[key];
    }
  }

  return newObj;
};

const validationRules = () => {
  return {
    date: "required|dateFormat:YYYY-MM-DD",
    employee_id: "required",
    working_type: "required",
    start: "required",
    end: "required",
    store_id: "required",
  };
};

const validationMessages = () => {
  return {
    "date.required": "Date is required",
    "date.dateFormat": "Date must be in YYYY-MM-DD format",
    "employee_id.required": "Employee Id is required",
    "working_type.required": "Working Type is required",
    "start.required": "Start Time is required",
    // "start.dateFormat": "Start Time must be in hh:mm format",
    "end.required": "End Time is required",
    // "end.dateFormat": "End Time must be in hh:mm format",
    "store_id.required": "Store Id is required",
  };
};

module.exports = { formattedData, validationRules, validationMessages };
