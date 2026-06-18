import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username"
      });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (admin.password !== hashedPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    // JWT Token Generate
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username
      },
      process.env.JWT_SECRET || "mysecretkey",
      {
        expiresIn: "1d"
      }
    );

    res.json({
      success: true,
      token,
      username: admin.username,
      message: "Login Successful"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
});

export default router;