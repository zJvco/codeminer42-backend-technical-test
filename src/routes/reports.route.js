const { Router } = require("express");
const router = Router();
const controller = require("../controllers/reports.controller");

// Routes
router.get("/transported-planet-resources", controller.selectTransportedResourcesPlanet);
router.get("/transported-pilot-resources", controller.selectTransportedResourcesPilot);
router.get("/transactions", controller.selectTransactions);

module.exports = router