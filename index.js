const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Random User Server");
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on: ${PORT}`);
});
