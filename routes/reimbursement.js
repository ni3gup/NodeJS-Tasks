const express = require("express");

const reimbursementController = require("../controllers/reimbursement");

const router = express.Router();

router.post("/add", reimbursementController.add);

router.get("/", reimbursementController.index);

router.post("/", reimbursementController.find);

module.exports = router;
