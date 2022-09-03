const fs = require("fs");
const express = require("express");
const userRouter = express.Router();
const userData = "./Data/userData.json";

// Get A random User Data
userRouter.get("/random", (req, res) => {
  fs.readFile(userData, (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedData = JSON.parse(data);
      const randomNumber = Math.floor(Math.random() * parsedData.length);
      const result = parsedData[randomNumber];
      res.send(result);
    }
  });
});

// Get All users
userRouter.get("/all", (req, res) => {
  const query = req.query.limit;
  fs.readFile(userData, (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedData = JSON.parse(data);
      if (query) {
        const limitedUser = parsedData.slice(0, query);
        res.send(limitedUser);
      } else {
        res.send(parsedData);
      }
    }
  });
});

module.exports = userRouter;
