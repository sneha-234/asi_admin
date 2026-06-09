
import express from "express";
import Value from "../models/Values.js";

const router = express.Router();

/* Get All Values */

router.get(
  "/",
  async (req, res) => {

    try {

      const values =
        await Value.find()
        .sort({
          createdAt: -1
        });

      res.json(values);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

/* Create / Update Value */

router.post(
  "/",
  async (req, res) => {

    try {

      console.log(
        "BODY =>",
        req.body
      );

      const data = {

        title:
          req.body.title || "",

        subtitle:
          req.body.subtitle || "",

        description:
          req.body.description || "",

        icon:
          req.body.icon || ""

      };

      let value;

      /* UPDATE */

      if (req.body.id) {

        value =
          await Value.findByIdAndUpdate(

            req.body.id,

            data,

            {
              new: true
            }

          );

      }

      /* CREATE */

      else {

        value =
          await Value.create(
            data
          );

      }

      res.json(value);

    } catch (err) {

      console.log(
        "VALUE ERROR =>",
        err
      );

      res.status(500).json({
        error: err.message
      });

    }

  }
);

/* Delete */

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await Value.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

export default router;

