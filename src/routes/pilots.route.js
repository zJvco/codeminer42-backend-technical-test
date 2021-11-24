const { Router } = require("express");
const router = Router();
const controller = require("../controllers/pilots.controller");

// Routes
router.get("/", controller.selectAllPilots);
router.get("/:id", controller.selectPilotById);
router.post("/", controller.createPilot);
router.post("/:id/journey", controller.journey);
router.post("/:id/accept-contract", controller.acceptContract);
router.post("/:id/collect-cargo", controller.collectContractCargo);

module.exports = router