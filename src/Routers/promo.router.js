const express = require("express");
const promoRouter = express.Router();

const { promoInfo, insertNewPromo, updatePromo, deletePromo } = require("../Handlers/promo.handler")

promoRouter.get("/", promoInfo);

promoRouter.post("/", insertNewPromo);

promoRouter.patch("/:id", updatePromo);

promoRouter.delete("/:id", deletePromo);

module.exports = promoRouter;