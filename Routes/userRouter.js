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

// Save a new User
userRouter.post("/save", (req, res) => {
  fs.readFile(userData, (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedData = JSON.parse(data);
      if (
        req.body.name &&
        req.body.gender &&
        req.body.contact &&
        req.body.address &&
        req.body.photoURL
      ) {
        const newUser = req.body;
        newUser.id = parsedData.length + 1;
        parsedData.push(newUser);
        fs.writeFile(userData, JSON.stringify(parsedData), (err) => {
          if (err) {
            throw err;
          } else {
            res
              .status(200)
              .send({ message: "New User Added Successfully ..!" });
          }
        });
      } else {
        res
          .status(406)
          .send({ message: "Please provide all the information ..!" });
      }
    }
  });
});

// Update a user Data
userRouter.patch("/update", (req, res) => {
  fs.readFile(userData, async (err, data) => {
    if (err) {
      throw err;
    } else {
      const { name, gender, contact, address, photoURL } = req.body;
      const insertedId = req.body.id;
      const parsedData = JSON.parse(data);
      const userIds = parsedData.map((user) => user.id);
      const exist = await userIds.includes(insertedId);
      if (exist && name && gender && contact && address && photoURL) {
        const updateInfo = parsedData.find((user) => user.id === req.body.id);
        const userIndex = parsedData.indexOf(updateInfo);
        parsedData[userIndex] = req.body;
        fs.writeFile(userData, JSON.stringify(parsedData), (err) => {
          if (err) {
            throw err;
          } else {
            res
              .status(200)
              .send({ message: "User data Updated Successfully ..!" });
          }
        });
      } else {
        res
          .status(406)
          .send({ message: "Please provide all the information ..!" });
      }
    }
  });
});

// 

module.exports = userRouter;
