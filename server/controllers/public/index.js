import express from "express";
import config from "config";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import userModel from "../../models/User/User.js";
import sendEmail from "../../utils/sendEmail.js";

const router = express.Router();
const URL = config.get("URL");
const JWT_SECRET = config.get("JWT_SECRET");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // existing user check
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // generate token for email
    const emailToken = Math.random().toString(36).substring(2);
    console.log(emailToken);

    //passing new user as object

    const newUser = {
      username,
      email,
      password: hashPassword,
      userVerifyToken: {
        email: emailToken,
      },
    };

    await userModel.create(newUser);

    //sending verification email

    await sendEmail({
      to: email,
      subject: "Email verification link",
      html: `<p>Verify your email using the link below:</p>
      <a href= "${URL}/api/public/verifyemail/${emailToken}">Click on me</a>`,
    });

    console.log(`${URL}/api/public/verifyemail/${emailToken}`);

    //Sending response

    res
      .status(201)
      .json({ message: "New user created ✅, verify email please" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// email verification

router.get("/verifyemail/:token", async (req, res) => {
  try {
    //taking token from params

    const { token } = req.params;

    //user check

    let user = await userModel.findOne({ "userVerifyToken.email": token });

    if (!user) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    //true and null

    user.userVerify.email = true;
    user.userVerifyToken.email = null;
    await user.save();

    //response

    res.status(200).json({ msg: `Email verified` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    //req.body part
    const { email, password } = req.body;

    //check if valid email
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    //check if email is verified

    if (!user.userVerify.email) {
      return res.status(400).json({ msg: "Email not verified." });
    }

    //check if pass matches

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    //generating token

    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ msg: "Logged in!✅ Here's your token:", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});
export default router;
