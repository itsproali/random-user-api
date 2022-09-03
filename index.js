const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./Routes/userRouter");
const PORT = process.env.PORT || 5000;

// MiddleWares
app.use(cors());
app.use(express.json());

// User Route
app.use("/user", userRouter);

// Default/Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Random User Server");
});

// Not Found Route
app.all("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on: ${PORT}`);
});
