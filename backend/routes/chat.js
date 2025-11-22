import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  res.json({ message: "Chat endpoint not implemented yet" });
});

export default router;
