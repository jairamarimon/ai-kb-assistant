import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  res.json({ message: "Scrape endpoint not implemented yet" });
});

export default router;
