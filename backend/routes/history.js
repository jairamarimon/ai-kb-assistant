import express from "express";
import { supabase } from "../services/supabase.js";

const router = express.Router();
const LIMIT = 50; // Number of history records to fetch

router.get("/", async (req, res) => {
  try {
    // Fetch last 50 chats, newest first
    const { data, error } = await supabase
      .from("history")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(LIMIT);

    if (error) {
      throw error;
    }

    res.json({ success: true, history: data });
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
