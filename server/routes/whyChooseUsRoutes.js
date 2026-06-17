import express from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import WhyChooseUs from "../models/WhyChooseUs.js";
import multer from "multer";

const router =
express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "asi-industries",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

router.get(
  "/",
  async(req,res)=>{

    let page =
    await WhyChooseUs.findOne();

    if(!page){

      page =
      await WhyChooseUs.create({});

    }

    res.json(page);

  }
);

router.post(
  "/",
  upload.single(
    "backgroundImage"
  ),
  async(req,res)=>{

    try{

      let page =
      await WhyChooseUs.findOne();

      const data = {

        heading:
        req.body.heading,

        subheading:
        req.body.subheading,

        sections:
        JSON.parse(
          req.body.sections || "[]"
        )

      };

      if (req.file) {

        data.backgroundImage =
        req.file.path;

      }

      if(page){

        page =
        await WhyChooseUs.findByIdAndUpdate(

          page._id,

          data,

          {
            new:true
          }

        );

      }else{

        page =
        await WhyChooseUs.create(
          data
        );

      }

      res.json(page);

    }

    catch(err){

      res.status(500).json({
        error:err.message
      });

    }

  }
);

export default router;