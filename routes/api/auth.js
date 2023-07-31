const express = require("express");

const { validateBody, authorization, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.validateShema), ctrl.register);
router.post("/login", validateBody(schemas.validateShema), ctrl.login);
router.get("/current", authorization, ctrl.getCurrent);
router.post("/logout", authorization, ctrl.logout);
router.patch("/avatars", authorization, upload.single("avatar"), ctrl.updateAvatar);
router.patch(
  "/",
  authorization,
  validateBody(schemas.validateSubscription),
  ctrl.updateSubscription
);

module.exports = router;
