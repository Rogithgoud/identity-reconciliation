const express = require("express");
const bodyParser = require("body-parser");

const identifyRoute = require("./routes/identifyRoute");

const app = express();

app.use(bodyParser.json());

app.use("/", identifyRoute);

app.get("/", (req, res) => {
    res.send("Identity Reconciliation API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});