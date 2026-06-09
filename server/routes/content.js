import express from "express";
import multer from "multer";
import { Brand, Leader, Content }from "../models/Content.js";
import protect from "../middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const router = express.Router();

// ── Image Upload ──────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});
const upload = multer({ storage });

// ── BRANDS ────────────────────────────────────────────────────

// PUBLIC — Get active brands

router.get("/brands", async (req, res) => {

  try {

    const brands =
      await Brand.find({
        isActive: true
      }).sort({ order: 1 });

    res.json(brands);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ADMIN — Get All
router.get("/brands/all", async (req, res) => {

  try {

    const brands =
      await Brand.find()
      .sort({ order: 1 });

    res.json(brands);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ADMIN — CREATE / UPDATE
router.post(
  "/brands",
  upload.single("logo"),
  async (req, res) => {

    try {

      let brand;

      /* =========================
         UPDATE
      ========================= */

      if (req.body.id) {

        const existingBrand =
          await Brand.findById(
            req.body.id
          );

        if (!existingBrand) {

          return res.status(404).json({
            message:
              "Brand not found"
          });

        }

        const updateData = {

          title:
            req.body.title ||
            existingBrand.title,

          subtitle:
            req.body.subtitle ||
            existingBrand.subtitle,

          logo:
            existingBrand.logo,

          isSection:
            existingBrand.isSection

        };

        if (req.file) {

          updateData.logo =
            "/uploads/" +
            req.file.filename;

        }

        brand =
          await Brand.findByIdAndUpdate(
            req.body.id,
            updateData,
            { new: true }
          );

      }

      /* =========================
         CREATE
      ========================= */

      else {

        // SAVE SECTION
        if (!req.file) {

          const section =
            await Brand.findOne({
              isSection: true
            });

          if (section) {

            brand =
              await Brand.findByIdAndUpdate(
                section._id,
                {
                  title:
                    req.body.title || "",

                  subtitle:
                    req.body.subtitle || ""
                },
                { new: true }
              );

          } else {

            brand =
              await Brand.create({

                title:
                  req.body.title || "",

                subtitle:
                  req.body.subtitle || "",

                isSection: true,

                isActive: true

              });

          }

        }

        // UPLOAD LOGO
        else {

          brand =
            await Brand.create({

              logo:
                "/uploads/" +
                req.file.filename,

              isSection: false,

              isActive: true

            });

        }

      }

      res.json(brand);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

// ADMIN — DELETE
router.delete(
  "/brands/:id",
  async (req, res) => {

    try {

      await Brand.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Brand deleted successfully"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

// ── LEADERS ───────────────────────────────────────────────────

// PUBLIC — Get active leaders
router.get('/leaders', async (req, res) => {
  try {
    const leaders = await Leader.find({ isActive: true }).sort({ order: 1 });
    res.json(leaders);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN — Get ALL leaders
router.get('/leaders/all',  async (req, res) => {
  try {
    const leaders = await Leader.find().sort({ order: 1 });
    res.json(leaders);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN — Add leader
router.post('/leaders', async (req, res) => {

  try {

    console.log("LEADER BODY =>", req.body);

    const leader = new Leader({

      name: req.body.name,

      role: req.body.role,

      initial:
        req.body.name
          ?.charAt(0)
          ?.toUpperCase(),

      quote1:
        req.body.quote1 || "",

      quote2:
        req.body.quote2 || "",

      isHighlighted:
        req.body.isHighlighted || false

    });

    await leader.save();

    res.json({
      message: 'Leader added!',
      leader
    });

  } catch (err) {

    console.log(
      "LEADER ERROR =>",
      err
    );

    res.status(500).json({
      error: err.message
    });

  }

});

// ADMIN — Update leader
router.put('/leaders/:id',  async (req, res) => {
  try {
    await Leader.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN — Delete leader
router.delete('/leaders/:id',  async (req, res) => {
  try {
    await Leader.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── PAGE CONTENT ──────────────────────────────────────────────

// PUBLIC — Get page content
router.get('/page/:page', async (req, res) => {
  try {
    const items = await Content.find({ page: req.params.page });
    const result = {};
    items.forEach(item => { result[item.key] = item.value; });
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN — Save single field
router.post('/page',  async (req, res) => {

  try {

    console.log("BODY =", req.body);

    const doc = await Content.findOneAndUpdate(
      { page: req.body.page, key: req.body.key },
      req.body,
      { upsert: true, new: true }
    );

    console.log("SAVED =", doc);

    res.json({
      message: 'Saved!',
      doc
    });

  } catch(err){

    console.log("ERROR =", err);

    res.status(500).json({
      error: err.message
    });
  }

});

// ADMIN — Save all fields at once (bulk)
router.post('/page/bulk',  async (req, res) => {
  try {
    const { items } = req.body;
    await Promise.all(items.map(({ page, section, key, value, type }) =>
      Content.findOneAndUpdate(
        { page, key },
        { page, section, key, value, type, updatedAt: new Date() },
        { upsert: true, new: true }
      )
    ));
    res.json({ message: 'All saved!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post(
  '/upload',
  
  upload.single('image'),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image uploaded'
        });
      }

      res.json({
        success: true,
        image: '/uploads/' + req.file.filename
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      });

    }

  }
);
export default router;