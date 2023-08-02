const express = require("express");

const { validateBody, authorization, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.validateSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.validateSchema), ctrl.login);
router.get("/current", authorization, ctrl.getCurrent);
router.post("/logout", authorization, ctrl.logout);
router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  ctrl.updateAvatar
);
router.patch(
  "/",
  authorization,
  validateBody(schemas.validateSubscription),
  ctrl.updateSubscription
);

module.exports = router;
