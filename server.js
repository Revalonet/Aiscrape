import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { deepSeek } from "./deepseek.js";

const app = express();
app.use(cors()); // izinkan request dari frontend
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("🚀 Rev AI backend running"));

app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message || "";
    const reply = await deepSeek(msg, false);
    res.json({ reply });
  } catch (err) {
    console.error("deepSeek error:", err?.message || err);
    res.status(500).json({ reply: "❌ Server error (deepSeek)." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
