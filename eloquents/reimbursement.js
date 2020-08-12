const ReimburesmentType = require("../models/reimbursementType");
const Reimburesment = require("../models/reimbursement");

const getTypeId = async (type) => {
  return await ReimburesmentType.findOne({
    where: { name: type },
    attributes: ["id"],
  });
};

const bulkInsert = async (data) => {
  Reimburesment.bulkCreate(data);
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
    attachement: "requiredIf:type,in:hotel,food,mobile,internet",
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
        amt: "requiredIf:type,in:hotel",
        inv_no: "requiredIf:type,hotel",
        attachement: "requiredIf:type,hotel",
      };
      break;

    case "food":
      mixedType = {
        amt: "requiredIf:type,in:food",
        inv_no: "requiredIf:type,food",
        attachement: "requiredIf:type,mobile",
      };
      break;

    case "mobile":
      mixedType = {
        amt: "requiredIf:type,in:mobile",
        inv_no: "requiredIf:type,mobile",
        attachement: "requiredIf:type,mobile",
      };
      break;

    case "internet":
      mixedType = {
        amt: "requiredIf:type,in:conveyance",
        inv_no: "requiredIf:type,internet",
        attachement: "requiredIf:type,internet",
      };
      break;

    default:
      break;
  }

  return mixedType;
};

module.exports = { getTypeId, rules, messages, bulkInsert };
