const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./Routes/userRouter");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Random User Server");
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on: ${PORT}`);
});
