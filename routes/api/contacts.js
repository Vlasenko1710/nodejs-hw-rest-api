const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authorization } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", authorization, ctrl.getAll);

router.get("/:contactId", authorization, isValidId, ctrl.getById);

router.post("/", authorization, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authorization, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authorization,
  isValidId,
  validateBody(schemas.updSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authorization,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
