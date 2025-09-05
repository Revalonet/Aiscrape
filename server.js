const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve file HTML dari folder public
app.use(express.static(path.join(__dirname, "public")));

// Endpoint chat (dummy)
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  res.json({ reply: `Rev AI menjawab: ${message}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
