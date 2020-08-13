const express = require("express");

const scheduleController = require("../controllers/schedule");

const router = express.Router();

router.post("/", scheduleController.process);

module.exports = router;
