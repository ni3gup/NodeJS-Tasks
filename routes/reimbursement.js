const express = require("express");

const reimbursementController = require("../controllers/reimbursement");

const router = express.Router();

router.post("/add", reimbursementController.add);

module.exports = router;
