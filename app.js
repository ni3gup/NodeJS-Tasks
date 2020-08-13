const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const reimbursementRoutes = require("./routes/reimbursement");

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ extended: true, limit: "50mb" }));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/reimbursement", reimbursementRoutes);

app.listen(3000, (req, res) => console.log(`Server Started on PORT 3000`));
