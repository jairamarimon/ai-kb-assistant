import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import scrapeRouter from "./routes/scrape.js";
import chatRouter from "./routes/chat.js";
import historyRouter from "./routes/history.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/scrape", scrapeRouter);
app.use("/chat", chatRouter);
app.use("/history", historyRouter);

app.get("/", (req, res) => res.send("AI KB Assistant Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
