import express from "express";
import multer from "multer";
import path from "path";
import ProductPage from "../models/Product.js";

const router = express.Router();

/* =========================
   MULTER CONFIG
========================= */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(
      null,
      "uploads"
    );

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(
        file.originalname
      )
    );

  }

});

const upload =
  multer({ storage });

/* =========================
   GET PAGE DATA
========================= */

router.get(
  "/",
  async (req, res) => {

    try {

      let page =
        await ProductPage.findOne();

      if (!page) {

        page =
          await ProductPage.create({

            heading: "",

            subheading: "",

            bannerImage: "",

            sections: []

          });

      }

      res.json(page);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

/* =========================
   SAVE PAGE DATA
========================= */

router.post(
  "/",
  upload.single(
    "bannerImage"
  ),
  async (req, res) => {

    try {

      let page =
        await ProductPage.findOne();

      const data = {

        heading:
          req.body.heading || "",

        subheading:
          req.body.subheading || "",

        sections:

          typeof req.body.sections ===
          "string"

            ? JSON.parse(
                req.body.sections
              )

            : req.body.sections || []

      };

      if (req.file) {

        data.bannerImage =
          "/uploads/" +
          req.file.filename;

      }

      if (page) {

        if (
          !req.file &&
          page.bannerImage
        ) {

          data.bannerImage =
            page.bannerImage;

        }

        page =
          await ProductPage.findByIdAndUpdate(

            page._id,

            data,

            {
              new: true
            }

          );

      } else {

        page =
          await ProductPage.create(
            data
          );

      }

      res.json(page);

    } catch (err) {

      console.log(
        "PRODUCT PAGE ERROR =>",
        err
      );

      res.status(500).json({

        error:
          err.message

      });

    }

  }
);

export default router;