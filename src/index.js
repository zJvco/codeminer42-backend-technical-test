const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const pilotsRoute = require("./routes/pilots.route");
const planetsRoute = require("./routes/planets.route");

app.use("/pilots", pilotsRoute);
app.use("/planets", planetsRoute);

app.listen(port);