import express from "express";
import crypto from "crypto";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body;

    console.log("USERNAME =>", username);

    const admin = await Admin.findOne({
    username
    });

    console.log("ADMIN =>", admin);

    if (!admin) {

      return res.status(401).json({
        success: false,
        message: "Invalid Username"
      });

    }

    const hashedPassword =
      crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    if (
      admin.password !==
      hashedPassword
    ) {

      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });

    }

    res.json({

      success: true,

      username:
        admin.username,

      message:
        "Login Successful"

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Server Error"

    });

  }

});

export default router;