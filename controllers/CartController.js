import userModel from "../models/userModel.js";

// addToCart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({
      _id: req.headers.userId,
    });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    // await userModel.findByIdAndUpdate(req.body, userId, { cartData });
    await userModel.findByIdAndUpdate(userData._id, { cartData }, req.body); //id whose value is to be updated, data,return 

    res.json({ success: true, messsage: "added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, messsage: "Error!!" });
  }
};
// removeFromCart
const removeFromCart = async (req, res) => {};
// getCart
const getCart = async (req, res) => {};

export { addToCart, removeFromCart, getCart };
