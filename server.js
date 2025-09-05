const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// pakai library scrape deepSeek mu nanti bisa dimasukin di sini
// untuk contoh, sekarang dummy reply

const app = express();
app.use(cors());
app.use(bodyParser.json());

// endpoint chat
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  // sementara dummy reply
  res.json({
    reply: `Rev AI menerima pesanmu: "${message}"`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
