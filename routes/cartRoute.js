import express from "express";
import authMiddleware from "../middlewares/authentication.js";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/CartController.js";

// const app = express();
const cartRouter = express.Router();
// remove from cart
cartRouter.post("/remove", authMiddleware, removeFromCart);
// Add to cart
cartRouter.post("/add", authMiddleware, addToCart);
// get cart details
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
