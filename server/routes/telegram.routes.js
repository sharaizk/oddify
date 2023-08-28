const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticate");
const telegramController = require("../controllers/telegram.controller");

router.post("/bot", telegramController.telegramBot);
router.post("/get-telegram-code", authenticateToken, telegramController.getTelegramCode);
router.post("/add-telegram-notification", authenticateToken, telegramController.addTelegramNotification);

router.post("/get-marketrunners-updates", telegramController.getMarketrunnersUpdates);

module.exports = router;
