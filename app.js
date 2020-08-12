const express = require("express");
const bodyParser = require("body-parser");

const reimbursementRoutes = require("./routes/reimbursement");

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use("/reimbursement", reimbursementRoutes);

app.listen(3000, (req, res) => console.log(`Server Started on PORT 3000`));
