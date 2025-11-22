import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "History endpoint not implemented yet" });
});

export default router;
