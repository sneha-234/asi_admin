import express from "express";
import multer from "multer";
import BuildingCard from "../models/BuildingCard.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const cards = await BuildingCard.find().sort({ order: 1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* CREATE + UPDATE */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY =>", req.body);
    console.log("FILE =>", req.file);

    let card;

    if (req.body.id && req.body.id.trim() !== "") {

      console.log("UPDATE BLOCK");

      const existingCard =
        await BuildingCard.findById(req.body.id);

      if (!existingCard) {
        return res.status(404).json({
          message: "Card not found"
        });
      }

      const updateData = {
        title: req.body.title,
        description: req.body.description,
        order: req.body.order || existingCard.order,
        image: existingCard.image
      };

      if (req.file) {
        updateData.image =
          "/uploads/" + req.file.filename;
      }

      card =
        await BuildingCard.findByIdAndUpdate(
          req.body.id,
          updateData,
          { new: true }
        );

    } else {

      console.log("CREATE BLOCK");

      card = await BuildingCard.create({
        title: req.body.title,
        description: req.body.description,
        image: req.file
          ? "/uploads/" + req.file.filename
          : "",
        order: req.body.order || 1
      });

    }

    res.json(card);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  try {

    const card =
      await BuildingCard.findByIdAndDelete(
        req.params.id
      );

    if (!card) {
      return res.status(404).json({
        message: "Card not found"
      });
    }

    res.json({
      success: true
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

export default router;