const { Router } = require("express");
const router = Router();
const controller = require("../controllers/planets.controller");

router.get("/", controller.selectAllPlanets);
router.post("/", controller.createPlanet);

module.exports = router