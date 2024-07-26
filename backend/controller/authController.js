import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

//token creation function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//signup controller functionality
export const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //function to find existing email
    const exists = await userModel.findOne({ email });
    //message is existing email found
    if (exists) {
      return res.json({ success: true, message: "User already exists" });
    }

    //check email validation using validator package
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // check password strong or not
    if (password.length < 5) {
      return res.json({
        success: false,
        message: "Password must be at least 5 characters",
      });
    }

    //hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in signup controller" });
  }
};

//sign in backend function
export const signinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check user email is available in the db
    const user = await userModel.findOne({ email });
    //if user is not available then throw an error
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    // match the password
    const isMatch = await bcrypt.compare(password, user.password);

    //if not match then throw an error
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
    //generate a token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in signing" });
  }
};
