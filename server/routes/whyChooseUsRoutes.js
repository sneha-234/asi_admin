import express from "express";
import multer from "multer";
import WhyChooseUs from "../models/WhyChooseUs.js";

const router =
express.Router();

const upload =
multer({
  dest:"uploads/"
});

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

      if(req.file){

        data.backgroundImage =
        "/uploads/" +
        req.file.filename;

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