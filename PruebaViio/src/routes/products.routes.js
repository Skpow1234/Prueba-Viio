import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  fetchCarts
} from "../controllers/products.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductSchema } from "../schemas/product.schema.js";

const router = Router();

router.get("/products", auth, getProducts);
router.post("/products", auth, validateSchema(createProductSchema), createProduct);
router.get("/products/:id", auth, getProduct);
router.put("/products/:id", auth, updateProduct);
router.delete("/products/:id", auth, deleteProduct);
router.get("/products/fetchCarts", auth, fetchCarts);

export default router;
