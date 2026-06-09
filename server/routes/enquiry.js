import express from "express";
import Enquiry from "../models/Enquiry.js";
import protect from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

/* =====================================
   PAGE CONTENT CMS
===================================== */

router.get(
  "/page-content",
  async (req, res) => {

    try {

      let page =
        await Enquiry.findOne({
          type: "pageContent"
        });

      if (!page) {

        page =
          await Enquiry.create({

            type: "pageContent",

            name: "Enquiry Page",

            heading: "",

            subheading: "",

            bannerImage: ""

          });

      }

      res.json(page);

    }

    catch (err) {

      console.log(
        "PAGE CONTENT GET ERROR =>",
        err
      );

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
        await Enquiry.findOne({
          type: "pageContent"
        });

      const data = {

        type: "pageContent",

        name: "Enquiry Page",

        heading:
          req.body.heading,

        subheading:
          req.body.subheading

      };

      if (req.file) {

        data.bannerImage =
          "/uploads/" +
          req.file.filename;

      }

      if (page) {

        page =
          await Enquiry.findByIdAndUpdate(

            page._id,

            data,

            {
              new: true
            }

          );

      }

      else {

        page =
          await Enquiry.create(data);

      }

      res.json(page);

    }

    catch (err) {

      console.log(
        "PAGE CONTENT SAVE ERROR =>",
        err
      );

      res.status(500).json({
        error: err.message
      });

    }

  }
);

/* =====================================
   ENQUIRY FORM SUBMIT
===================================== */

router.post(
  "/",
  async (req, res) => {

    try {

      const enquiry =
        new Enquiry(
          req.body
        );

      await enquiry.save();

      res.json({
        message:
          "Enquiry submitted!"
      });

    }

    catch (err) {

      res.status(500).json({
        error:
          err.message
      });

    }

  }
);

/* =====================================
   ENQUIRY LIST
===================================== */

router.get(
  "/",
  async (req, res) => {

    try {

      const enquiries =
        await Enquiry.find({

          type: {
            $ne:
              "pageContent"
          }

        })
        .sort({
          date: -1
        });

      res.json(
        enquiries
      );

    }

    catch (err) {

      res.status(500).json({
        error:
          err.message
      });

    }

  }
);

/* =====================================
   COUNTS
===================================== */

router.get(
  "/counts",
  async (req, res) => {

    try {

      const total =
        await Enquiry.countDocuments({

          type: {
            $ne:
              "pageContent"
          }

        });

      const newCount =
        await Enquiry.countDocuments({

          type: {
            $ne:
              "pageContent"
          },

          status:
            "new"

        });

      res.json({

        total,

        new:
          newCount

      });

    }

    catch (err) {

      res.status(500).json({
        error:
          err.message
      });

    }

  }
);

/* =====================================
   UPDATE STATUS
===================================== */

router.patch(
  "/:id/status",
  protect,
  async (req, res) => {

    try {

      await Enquiry.findByIdAndUpdate(

        req.params.id,

        {
          status:
            req.body.status
        }

      );

      res.json({

        message:
          "Status updated!"

      });

    }

    catch (err) {

      res.status(500).json({
        error:
          err.message
      });

    }

  }
);

/* =====================================
   DELETE ENQUIRY
===================================== */

router.delete(
  "/:id",
  protect,
  async (req, res) => {

    try {

      await Enquiry.findByIdAndDelete(
        req.params.id
      );

      res.json({

        message:
          "Deleted!"

      });

    }

    catch (err) {

      res.status(500).json({
        error:
          err.message
      });

    }

  }
);

export default router;

