const { Router } = require("express");
const router = Router();
const controller = require("../controllers/resources.controller");

router.get("/", controller.selectAllResources);
router.get("/:id", controller.selectResource);
router.post("/", controller.createResource);

module.exports = router