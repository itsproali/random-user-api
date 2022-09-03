const fs = require("fs");
const express = require("express");
const userRouter = express.Router();

// Get A random User Data
userRouter.get("/random", (req, res, next) => {
  fs.readFile("./Data/data.json", (err, data) => {
    if (err) {
      next(err);
    } else {
      const parsedData = JSON.parse(data);
      const randomNumber = Math.floor(Math.random() * parsedData.length);
      const result = parsedData[randomNumber];
      res.send(result);
    }
  });
});

module.exports = userRouter;
