import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";
import dotenv from "dotenv";
import UserModal from "../models/user.js";
dotenv.config();

const SECRET = process.env.SECRET;
sgMail.setApiKey(process.env.SENDGRID_API);
const BASE_URL = process.env.BASE_URL;
const yourEmail = "EmailLinkedWithSendGrid@example.com";
// for local testing
// const BASE_URL = "http://localhost:3000";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModal.findOne({ email });

    if (!existingUser) return res.json({ message: "Invalid user" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.json({ message: "Invalid credentials" }).status(400);

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await UserModal.findOne({ email });

    if (existingUser) return res.json({ message: "User already exists" });

    if (password !== confirmPassword) return res.json({ message: "Passwords doesn't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const forgot_password = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await UserModal.findOne({ email });

    if (!existingUser) {
      return res.json({ message: "Invalid user" });
    } else {
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
        } else {
          const token = buffer.toString("hex");
          existingUser.passwordResetToken = token;
          existingUser.resetTokenExpire = Date.now() + 3600000;
          existingUser.save().then(async (result) => {
            const msg = {
              to: email,
              from: yourEmail,
              subject: "Password reset",
              text: "Memories account password reset",
              html: `
                <h2>Memories account Password Reset</h2>
                <br>
                <h4>Click <a href="${BASE_URL}/auth/reset_password/${token}">here</a> to reset your password</h4>
                <br>
                <br>
                <br>
                <br>
                <footer>
                <p>If this request was not maid by you, Please ignore this mail.</p>
                <a href="${BASE_URL}">Memories website</a>
                </footer>
              `,
            };
            await sgMail.send(msg);
            res.json({ message: "Mail Send" });
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserByToken = async (req, res) => {
  const { token } = req.body;

  try {
    const userExistWithThatToken = await UserModal.findOne({ passwordResetToken: token });
    if (userExistWithThatToken) {
      res.json({ message: "User exist" });
    } else {
      res.json({ message: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const password_reset = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const userExistWithThatToken = await UserModal.findOne({
      passwordResetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!userExistWithThatToken) {
      res.json({ message: "Token expire" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      userExistWithThatToken.password = hashedPassword;
      userExistWithThatToken.passwordResetToken = undefined;
      userExistWithThatToken.resetTokenExpire = undefined;

      userExistWithThatToken.save().then((userSaved) => {
        res.json({ message: "Password reset successfully" });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
