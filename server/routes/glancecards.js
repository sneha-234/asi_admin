import express from "express";
import GlanceCard from "../models/GlanceCard.js";

const router = express.Router();

/* =========================
   GET ALL SECTIONS
========================= */

router.get("/", async (req, res) => {

  try {

    const cards =
      await GlanceCard.find();

    res.json(cards);

  }

  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

/* =========================
   CREATE / UPDATE SECTION
========================= */

router.post("/", async (req, res) => {

  try {

    console.log(
      "BODY =>",
      req.body
    );

    let card;

    // UPDATE
    if (req.body.id) {

      card =
        await GlanceCard.findByIdAndUpdate(

          req.body.id,

          {
            content:
              req.body.content
          },

          {
            new: true
          }

        );

    }

    // CREATE
    else {

      card =
        await GlanceCard.create({

          content:
            req.body.content

        });

    }

    res.json({

      success: true,

      data: card

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

});

/* =========================
   DELETE SECTION
========================= */

router.delete("/:id", async (req, res) => {

  try {

    await GlanceCard.findByIdAndDelete(
      req.params.id
    );

    res.json({

      success: true,

      message:
        "Section deleted successfully"

    });

  }

  catch (err) {

    res.status(500).json({

      success: false,

      message:
        err.message

    });

  }

});

export default router;