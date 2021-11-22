const { Router } = require("express");
const router = Router();
const controller = require("../controllers/pilots.controller");

// Routes
router.get("/", controller.selectAllPilots);
router.get("/:id", controller.selectPilotById);
router.post("/", controller.createPilot);

module.exports = router