const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const pilotsRoute = require("./routes/pilots.route");

app.use("/pilots", pilotsRoute);

app.listen(port);