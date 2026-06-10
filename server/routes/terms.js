import express from "express";
import TermsConditions from "../models/TermsConditions.js";

const router = express.Router();

/* GET */

router.get(
  "/",
  async (req, res) => {

    try {

      const terms =
        await TermsConditions
        .findOne();

      res.json(
        terms || {
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

/* SAVE */

router.post(
  "/",
  async (req, res) => {

    try {

      let terms =
        await TermsConditions
        .findOne();

      if (!terms) {

        terms =
          await TermsConditions
          .create({
            content:
              req.body.content
          });

      } else {

        terms.content =
          req.body.content;

        await terms.save();

      }

      res.json(terms);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

export default router;