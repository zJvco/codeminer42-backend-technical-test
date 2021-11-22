const { Router } = require("express");
const router = Router();
const controller = require("../controllers/planets.controller");

// Routes
router.get("/", controller.selectAllPlanets);
router.get("/:id", controller.selectPlanet);
router.post("/", controller.createPlanet);

module.exports = router