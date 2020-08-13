const { Validator } = require("node-input-validator");

const reimbursementEloquent = require("../eloquents/reimbursement");

const add = async (req, res) => {
  const errors = [];

  const { type, reimbursements } = req.body;

  if (!type || (reimbursements && reimbursements.length === 0)) {
    res.status(400).json({ message: "Invalid Inputs" });
  }

  try {
    const typeData = await reimbursementEloquent.getType({ name: type }, [
      "id",
    ]);

    if (!typeData) {
      return res
        .status(400)
        .json({ message: "Invalid Reimbursement Type", status: false });
    }

    const typeId = typeData.id;

    // validate
    const rules = reimbursementEloquent.rules(type);
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
      } else {
        // upload attachement
        if (reimbursement.attachement) {
          const attachementPath = reimbursementEloquent.uploadAttachement(
            reimbursement.attachement,
            type,
            reimbursement.date
          );

          reimbursements[i].attachement = attachementPath;
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors, status: false });
    }

    // insert into database
    reimbursementEloquent.bulkInsert(reimbursements);

    res.status(201).json({ message: "Data Inserted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops! Something went wrong" });
  }
};

const index = async (req, res) => {
  const returnData = {};

  try {
    const reimbursementTypes = await reimbursementEloquent.getTypes();

    const selectData = reimbursementEloquent.selectData();

    for (let i = 0; i < reimbursementTypes.length; i++) {
      const type = reimbursementTypes[i];
      let data = { id: type.id, reimbursements: [] };

      const reimbursements = await reimbursementEloquent.getReimbursements(
        type.id,
        type.name,
        selectData
      );

      data.reimbursements = reimbursements;

      returnData[type.name] = data;
    }

    res.status(200).json({ returnData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops! Something went wrong" });
  }
};

const find = async (req, res) => {
  const { typeId, date } = req.body;

  try {
    const typeData = await reimbursementEloquent.getType({ id: typeId }, [
      "name",
    ]);

    if (!typeData) {
      return res
        .status(400)
        .json({ message: "Invalid Reimbursement Type", status: false });
    }

    const selectData = reimbursementEloquent.selectData();

    const reimbursement = await reimbursementEloquent.getReimbursement(
      typeId,
      typeData.name,
      date,
      selectData
    );

    res.json({ data: reimbursement });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops! Something went wrong" });
  }
};

module.exports = { add, index, find };
