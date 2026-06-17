import express from "express";
import multer from "multer";
import ContactPage from "../models/ContactUs.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "asi-contact",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

router.get(
  "/",
  async(req,res)=>{

    let page =
    await ContactPage.findOne();

    if(!page){

      page =
      await ContactPage.create({

        heading:"",
        subheading:"",
        bannerImage:"",
        features:[]

      });

    }

    res.json(page);

  }
);

router.post(
  "/",
  upload.single("bannerImage"),
  async(req,res)=>{

    try{

      let page =
      await ContactPage.findOne();

      const data = {

        heading:req.body.heading,

        subheading:req.body.subheading,

        features:
        JSON.parse(
          req.body.features || "[]"
        )

      };

      if (req.file) {

        data.bannerImage =
        req.file.path;

      }

      if(page){

        page =
        await ContactPage.findByIdAndUpdate(

          page._id,

          data,

          {new:true}

        );

      }

      else{

        page =
        await ContactPage.create(data);

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