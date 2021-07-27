import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // to find the user in DB
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists." });

    // this means to compare password to existingUser.password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // is password isn't correct
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid username or password." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // after everthing successful we return the result and token
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    // to find the user in DB
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords doesn't match." });

    // Create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // once everthing is ok we send user: result ans token
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
