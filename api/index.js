import express from "express";
import cors from "cors";
import { connectDB } from "../config/db.js";
import foodRouter from "../routes/foodRoute.js";
import userRouter from "../routes/userRoutes.js";
import cartRouter from "../routes/cartRoute.js";
import "dotenv/config.js";

const app = express();

const PORT = 8080;

// middleware
app.use(express.json()); //--> req is parsed
app.use(cors()); //-> handle cross-origin-resource-sharing
// Db Connection
connectDB();

// Api EndPoints
app.use("/images", express.static("uploads"));
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API - TEST RUN SUCESSFUL");
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
//
