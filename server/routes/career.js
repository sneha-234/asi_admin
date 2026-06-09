import express from "express";
import multer from "multer";

import {
  Career,
  Application,
  CareerPage
} from "../models/Career.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});



/* ==================================
   CAREER PAGE CMS
================================== */

router.get(
  "/page-content",
  async (req, res) => {

    try {

      let page =
        await CareerPage.findOne();

      if (!page) {

        page =
          await CareerPage.create({

            heading: "",

            subheading: "",

            bannerImage: "",

            features: []

          });

      }

      res.json(page);

    }

    catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

router.post(
  "/page-content",
  upload.single("bannerImage"),
  async (req, res) => {

    try {

      let page =
        await CareerPage.findOne();

      const data = {

        heading:
          req.body.heading,

        subheading:
          req.body.subheading,

        features:
          JSON.parse(
            req.body.features || "[]"
          )

      };

      if (req.file) {

        data.bannerImage =
          "/uploads/" +
          req.file.filename;

      }

      if (page) {

        page =
          await CareerPage.findByIdAndUpdate(

            page._id,

            data,

            {
              new: true
            }

          );

      }

      else {

        page =
          await CareerPage.create(
            data
          );

      }

      res.json(page);

    }

    catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);



/* ==================================
   JOBS
================================== */

router.get(
  "/jobs",
  async (req, res) => {

    const jobs =
      await Career.find()
      .sort({
        createdAt: -1
      });

    res.json(jobs);

  }
);

router.post(
  "/jobs",
  async (req, res) => {

    const job =
      await Career.create(
        req.body
      );

    res.json(job);

  }
);

router.delete(
  "/jobs/:id",
  async (req, res) => {

    await Career.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true
    });

  }
);



/* ==================================
   APPLICATIONS
================================== */

router.get(
  "/applications",
  async (req, res) => {

    const apps =
      await Application.find()
      .sort({
        appliedAt: -1
      });

    res.json(apps);

  }
);

router.post(
  "/apply",
  async (req, res) => {

    try {

      const application =
        await Application.create(
          req.body
        );

      res.json({

        success: true,

        application

      });

    }

    catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);



/* ==================================
   DELETE APPLICATION
================================== */

router.delete(
  "/applications/:id",
  async (req, res) => {

    try {

      await Application.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true
      });

    }

    catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

export default router;