import express from "express";
import multer from "multer";
import GlanceCard from "../models/GlanceCard.js";

const router = express.Router();

/* =========================
   MULTER CONFIG
========================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }
});

const upload = multer({ storage });

/* =========================
   GET ALL CARDS
========================= */

router.get("/", async (req, res) => {
  try {
    const cards = await GlanceCard.find();

    res.json(cards);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

/* =========================
   CREATE OR UPDATE CARD
========================= */

router.post(
  "/",
  upload.single("icon"),
  async (req, res) => {
    try {
      console.log("BODY =>", req.body);
      console.log("FILE =>", req.file);

      let card;

      // UPDATE
      if (req.body.id) {
        const existingCard =
          await GlanceCard.findById(
            req.body.id
          );

        if (!existingCard) {
          return res.status(404).json({
            message: "Card not found"
          });
        }

        const updateData = {
          title: req.body.title,
          description: req.body.description,

          // old image preserve
          icon: existingCard.icon
        };

        // new image selected
        if (req.file) {
          updateData.icon =
            "/uploads/" +
            req.file.filename;
        }

        card =
          await GlanceCard.findByIdAndUpdate(
            req.body.id,
            updateData,
            { new: true }
          );
      }

      // CREATE
      else {
        card = await GlanceCard.create({
          title: req.body.title,
          description:
            req.body.description,

          icon: req.file
            ? "/uploads/" +
              req.file.filename
            : ""
        });
      }

      res.json(card);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message
      });
    }
  }
);

/* =========================
   DELETE CARD
========================= */

router.delete("/:id", async (req, res) => {
  try {
    await GlanceCard.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Card deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

export default router;