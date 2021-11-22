const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const pilotsRoute = require("./routes/pilots.route");
const planetsRoute = require("./routes/planets.route");
const shipsRoute = require("./routes/ships.route");

app.use("/pilots", pilotsRoute);
app.use("/planets", planetsRoute);
app.use("/ships", shipsRoute);

app.listen(port);