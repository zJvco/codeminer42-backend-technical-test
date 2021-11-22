const { Router } = require("express");
const router = Router();
const controller = require("../controllers/ships.controller");

// Routes
router.get("/", controller.selectAllShips);
router.get("/:id", controller.selectShip);
router.post("/", controller.createShip);

module.exports = router