import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // to find the user in DB
    const existingUser = await UserModal.findOne({ email });

    if (!existingUser) return res.json({ message: "Invalid user" });

    // this means to compare password to existingUser.password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    // is password isn't correct
    if (!isPasswordCorrect) return res.json({ message: "Invalid credentials" }).status(400);

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, {
      expiresIn: "1h",
    });

    // after everthing successful we return the result and token
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    // to find the user in DB
    const existingUser = await UserModal.findOne({ email });

    if (existingUser) return res.json({ message: "User already exists" });

    if (password !== confirmPassword) return res.json({ message: "Passwords doesn't match" });

    // Create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    // once everthing is ok we send user: result ans token
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
