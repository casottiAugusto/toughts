const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");
//helpers
const { checkAuth } = require("../helpers/auth");
// controller
router.get("/", ToughtController.showToughts);
router.get("/add", checkAuth, ToughtController.createTought);
router.post("/add", checkAuth, ToughtController.createToughtSave);
router.post("/remove", checkAuth, ToughtController.removeTought);

router.get("/dashboard", checkAuth, ToughtController.dashboard);
module.exports = router;
