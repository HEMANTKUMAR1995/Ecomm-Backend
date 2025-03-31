import express from "express";
import {
  addFoodItem,
  listFoodItem,
  removeFoodItem,
} from "../controllers/foodContoller.js";
import multer from "multer";

const foodRouter = express.Router();

// image storge logic
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); //--->middleWare to upload image

//Routes
foodRouter.post("/add", upload.single("image"), addFoodItem);
foodRouter.get("/getFoodList", listFoodItem);
foodRouter.delete("/removeItem", removeFoodItem);

export default foodRouter;
