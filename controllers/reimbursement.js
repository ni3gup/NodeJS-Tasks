const { Validator } = require("node-input-validator");

const reimbursementEloquent = require("../eloquents/reimbursement");

const add = async (req, res) => {
  const errors = [];

  const { type, reimbursements } = req.body;

  if (!type || (reimbursements && reimbursements.length === 0)) {
    res.status(404).json({ message: "Invalid Inputs" });
  }

  const typeData = await reimbursementEloquent.getTypeId(type);
  const typeId = typeData.id;

  // validate
  const rules = reimbursementEloquent.rules(type);
  console.log(rules);
  const messages = reimbursementEloquent.messages();

  for (let i = 0; i < reimbursements.length; i++) {
    const reimbursement = {
      type,
      reimbursement_type_id: typeId,
      ...reimbursements[i],
    };
    reimbursements[i] = reimbursement;

    const v = new Validator(reimbursement, rules, messages);
    const matched = await v.check();

    if (!matched) {
      errors.push({
        date: reimbursement.date,
        errors: v.errors,
      });
    }
  }

  if (errors.length > 0) {
    return res.status(404).json({ errors, status: false });
  }

  // insert into database
  reimbursementEloquent.bulkInsert(reimbursements);

  res.json({ message: "Data Inserted Successfully" });
};

module.exports = { add };
