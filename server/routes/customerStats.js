import express from "express";
import CustomerPage from "../models/CustomerStats.js";

const router = express.Router();

router.get("/", async (req, res) => {

try {


let page =
  await CustomerPage.findOne();

if (!page) {

  page =
    await CustomerPage.create({
      sections: []
    });

}

res.json(page);


} catch (err) {


res.status(500).json({
  error: err.message
});


}

});

router.post("/", async (req, res) => {

  try {

    let page =
      await CustomerPage.findOne();

    if (page) {

      page.sections =
        req.body.sections || [];

      await page.save();

    } else {

      page =
        await CustomerPage.create({

          sections:
            req.body.sections || []

        });

    }

    res.json(page);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

router.delete("/:index", async (req, res) => {

try {


const page =
  await CustomerPage.findOne();

if (!page) {

  return res.status(404).json({
    error: "Page not found"
  });

}

page.sections.splice(
  parseInt(req.params.index),
  1
);

await page.save();

res.json({
  success: true,
  sections: page.sections
});


} catch (err) {

res.status(500).json({
  error: err.message
});


}

});

export default router;
