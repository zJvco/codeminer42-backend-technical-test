const { Router } = require("express");
const router = Router();
const controller = require("../controllers/contracts.controller");

// Routes
router.get("/", controller.selectAllContracts);
router.get("/:id", controller.selectContractById);
router.post("/", controller.createContract);

module.exports = router