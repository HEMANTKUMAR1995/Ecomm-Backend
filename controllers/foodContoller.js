// import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFoodItem = async (req, res) => {
  let image_filename = `${req?.file?.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ success: true, message: "food item added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error!" });
  }
};
//display all food list
const listFoodItem = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};
//remove food item
const removeFoodItem = async (req, res) => {
  try {
    const id = req?.body?.id;
    const food = await foodModel.findById(id);
    fs.unlink(`uploads/${food?.image}`, () => {}); //-->delete image from local folder i.e uploads
    await foodModel.findByIdAndDelete(req.body.id); //-->deleting seelcted food item from db\
    res.json({ success: true, message: "Food Sucsessfully deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};
export { addFoodItem, listFoodItem, removeFoodItem };
