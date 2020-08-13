const path = require("path");
const fs = require("fs");

const moment = require("moment");

const ReimburesmentType = require("../models/reimbursementType");
const Reimburesment = require("../models/reimbursement");
const { request } = require("express");

const getType = async (conditions, attributes) => {
  try {
    return await ReimburesmentType.findOne({
      where: conditions,
      attributes,
    });
  } catch (error) {
    throw error;
  }
};

const bulkInsert = async (data) => {
  try {
    Reimburesment.bulkCreate(data);
  } catch (error) {
    throw error;
  }
};

const getTypes = async () => {
  try {
    return await ReimburesmentType.findAll({ attributes: ["id", "name"] });
  } catch (error) {
    throw error;
  }
};

const getReimbursements = async (id, name, selectData) => {
  try {
    return await Reimburesment.findAll({
      where: { reimbursement_type_id: id },
      order: ["date"],
      attributes: selectData[name],
    });
  } catch (error) {
    throw error;
  }
};

const getReimbursement = async (id, name, date, selectData) => {
  try {
    return await Reimburesment.findOne({
      where: { reimbursement_type_id: id, date },
      attributes: selectData[name],
    });
  } catch (error) {
    throw error;
  }
};

const uploadAttachement = (attachement, type, date) => {
  let attachementPath = "";
  if (attachement) {
    // Check if folder exists or create
    const dir = path.join(__dirname, "..", "public", "uploads");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const base64Data = attachement.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const fileExtension = base64Data[1].split("/")[1];
    const attachementData = attachement.split(";base64,").pop();
    const uploadPath = `${dir}/${type}-${date}-${moment().valueOf()}.${fileExtension}`;
    attachementPath = `uploads/${type}-${date}-${moment().valueOf()}.${fileExtension}`;

    fs.writeFile(uploadPath, attachementData, { encoding: "base64" }, () => {});
  }

  return attachementPath;
};

const rules = (type) => {
  let mixedType = getMixedType(type);

  return {
    date: "required|dateFormat:YYYY-MM-DD",
    from_place: "requiredIf:type,conveyance",
    to_place: "requiredIf:type,conveyance",
    purpose:
      "requiredIf:type,conveyance|in:market_visit,other_city_travel,office_visit,training,other,",
    other_purpose: "requiredIf:purpose,other",
    mode: "requiredIf:type,conveyance|in:bike,bus,taxi,train,auto,other",
    other_mode: "requiredIf:mode,other",
    from_date: "requiredIf:type,hotel|dateFormat:YYYY-MM-DD",
    to_date: "requiredIf:type,hotel|dateFormat:YYYY-MM-DD",
    hotel_name: "requiredIf:type,hotel",
    ...mixedType,
  };
};

const messages = (type) => {
  return {
    "date.required": "Date is required",
    "date.dateFormat": "Date must be in YYYY-MM-DD format",
    "from_place.requiredIf": "From Place is required",
    "to_place.requiredIf": "To Place is required",
    "purpose.requiredIf": "Purpose is required",
    "other_purpose.requiredIf": "Other Purpose is required",
    "mode.requiredIf": "Mode is required",
    "other_mode.requiredIf": "Other Mode is required",
    "amt.requiredIf": "Amount is required",
    "from_date.requiredIf": "From Date is required",
    "from_date.dateFormat": "From Date must be in YYYY-MM-DD format",
    "to_date.requiredIf": "To Date is required",
    "to_date.dateFormat": "To Date must be in YYYY-MM-DD format",
    "hotel_name.requiredIf": "Hotel Name is required",
    "inv_no.requiredIf": "Invoice Number is required",
    "attachement.requiredIf": "Attachement is required",
  };
};

const getMixedType = (type) => {
  let mixedType = {};

  switch (type) {
    case "conveyance":
      mixedType = {
        amt: "requiredIf:type,conveyance",
      };
      break;

    case "hotel":
      mixedType = {
        amt: "requiredIf:type,hotel",
        inv_no: "requiredIf:type,hotel",
        attachement: "requiredIf:type,hotel",
      };
      break;

    case "food":
      mixedType = {
        amt: "requiredIf:type,food",
        inv_no: "requiredIf:type,food",
        attachement: "requiredIf:type,food",
      };
      break;

    case "mobile":
      mixedType = {
        amt: "requiredIf:type,mobile",
        inv_no: "requiredIf:type,mobile",
        attachement: "requiredIf:type,mobile",
      };
      break;

    case "internet":
      mixedType = {
        amt: "requiredIf:type,internet",
        inv_no: "requiredIf:type,internet",
        attachement: "requiredIf:type,internet",
      };
      break;

    default:
      break;
  }

  return mixedType;
};

const selectData = () => {
  return {
    conveyance: [
      "date",
      "from_place",
      "to_place",
      "purpose",
      "mode",
      "km",
      "inv_no",
      "amt",
      "attachement",
    ],
    hotel: [
      "date",
      "from_date",
      "to_date",
      "hotel_name",
      "inv_no",
      "amt",
      "attachement",
    ],
    food: ["inv_no", "amt", "attachement"],
    mobile: ["inv_no", "amt", "attachement"],
    internet: ["inv_no", "amt", "attachement"],
  };
};

module.exports = {
  getType,
  getTypes,
  getReimbursements,
  getReimbursement,
  rules,
  messages,
  bulkInsert,
  selectData,
  uploadAttachement,
};
