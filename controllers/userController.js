import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "No user found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    req.json({ success: false, message: "invalid Credential Error" });
  }
};

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  //   chekcing if user already exist 
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.json({ success: false, message: "user already exists" });
    }
    // email validation & password strength
    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "please enter a valid email" });
    }
    if (password.length < 8) {
      res.json({ success: false, messsage: "please enter a strong password" });
    }
    // hashing user password-encryption
    const salt = await bcrypt.genSalt(5);
    const hashedPwd = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPwd,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: `Error : ${err}` });
  }
};

export { userLogin, userRegister };
