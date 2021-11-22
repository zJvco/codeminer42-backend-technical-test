const { Router } = require("express");
const router = Router();
const controller = require("../controllers/contracts.controller");

router.get("/", controller.selectAllContracts);
router.get("/:id", controller.selectContractById);
router.post("/", controller.createContract);

module.exports = router