import express from "express";
import PrivacyPolicy from "../models/PrivacyPolicy.js";

const router = express.Router();

router.get(
  "/",
  async (req, res) => {

    try {

      const data =
        await PrivacyPolicy.findOne();

      res.json(
        data || {
          content: ""
        }
      );

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

router.post(
  "/",
  async (req, res) => {

    try {

      let data =
        await PrivacyPolicy.findOne();

      if (!data) {

        data =
          await PrivacyPolicy.create({
            content:
              req.body.content
          });

      } else {

        data.content =
          req.body.content;

        await data.save();

      }

      res.json(data);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

export default router;