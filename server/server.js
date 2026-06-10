import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import glanceRoutes from "./routes/glancecards.js";
import buildingRoutes from "./routes/buildingcards.js";
import enquiryRoutes from "./routes/enquiry.js";
import careerRoutes from "./routes/career.js";
import productRoutes from "./routes/product.js";
import contentRoutes from "./routes/content.js";
import valueRoutes from "./routes/valueRoutes.js";
import customerStatsRoutes from "./routes/customerStats.js";
import whyChooseUsRoutes from "./routes/whyChooseUsRoutes.js";
import contactUsRoutes from "./routes/contactUsRoutes.js";
import authRoutes from "./routes/auth.js";
import termsRoutes from "./routes/terms.js";
import privacyPolicyRoutes from "./routes/privacy-policy.js";


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use( "/uploads", express.static("uploads") );

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.use("/api/glancecards", glanceRoutes);
app.use("/api/buildingcards", buildingRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/product-page" , productRoutes)
app.use("/api/content", contentRoutes);
app.use("/api/values",valueRoutes);
app.use("/api/customer-page",customerStatsRoutes);
app.use("/api/why-choose-us",whyChooseUsRoutes);
app.use( "/api/contact-us",contactUsRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/terms",termsRoutes);
app.use("/api/privacy-policy",privacyPolicyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});