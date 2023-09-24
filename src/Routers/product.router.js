const express = require("express");
const productRouter = express.Router();

const { productInfo, insertNewProduct, updatePrice, deleteProduct, searchProduct } = require("../Handlers/product.handler")

productRouter.get("/", productInfo);

productRouter.post("/", insertNewProduct);

productRouter.patch("/:id", updatePrice);

productRouter.delete("/:id", deleteProduct);

productRouter.get("/search", searchProduct);

module.exports = productRouter;