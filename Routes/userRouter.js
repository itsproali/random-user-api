const fs = require("fs");
const express = require("express");
const userRouter = express.Router();
const userData = "./Data/userData.json";

// Get A random User Data
userRouter.get("/random", (req, res, next) => {
  fs.readFile(userData, (err, data) => {
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

// Get All users
userRouter.get("/all", (req, res, next) => {
  const query = req.query.limit;
  fs.readFile(userData, (err, data) => {
    if (err) {
      next(err);
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
userRouter.post("/save", (req, res, next) => {
  fs.readFile(userData, (err, data) => {
    if (err) {
      next(err);
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
            next(err);
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
userRouter.patch("/update", (req, res, next) => {
  fs.readFile(userData, async (err, data) => {
    if (err) {
      next(err);
    } else {
      const { name, gender, contact, address, photoURL } = req.body;
      const insertedId = parseInt(req.body.id);
      const parsedData = JSON.parse(data);
      const userIds = parsedData.map((user) => user.id);
      const exist = await userIds.includes(insertedId);
      if (exist && name && gender && contact && address && photoURL) {
        const updateInfo = parsedData.find((user) => user.id === insertedId);
        const userIndex = parsedData.indexOf(updateInfo);
        parsedData[userIndex] = req.body;
        fs.writeFile(userData, JSON.stringify(parsedData), (err) => {
          if (err) {
            next(err);
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

// update multiple user info
userRouter.patch("/bulk-update", (req, res, next) => {
  fs.readFile(userData, (err, data) => {
    if (err) {
      next(err);
    } else {
      const parsedData = JSON.parse(data);
      const userIds = parsedData.map((user) => user.id);
      if (Array.isArray(req.body)) {
        for (user of req.body) {
          const exist = userIds.includes(user.id);
          if (exist) {
            const updateInfo = parsedData.find((u) => u.id === user.id);
            const userIndex = parsedData.indexOf(updateInfo);
            parsedData[userIndex] = user;
            fs.writeFile(userData, JSON.stringify(parsedData), (err) => {
              if (err) {
                next(err);
              } else {
                res.status(200).send({
                  message: "Users updated successfully",
                });
              }
            });
          } else {
            res.status(406).send({ message: "Invalid Inserted Data ..!" });
          }
        }
      } else {
        res
          .status(406)
          .send({ message: "Provided Data should be an array of object...!" });
      }
    }
  });
});

// Delete an user
userRouter.delete("/delete", (req, res, next) => {
  fs.readFile(userData, (err, data) => {
    if (err) {
      next(err);
    } else {
      const parsedData = JSON.parse(data);
      const insertedId = parseInt(req.body.id);
      const exist = parsedData.find((user) => user.id === insertedId);

      if (exist) {
        parsedData.splice(insertedId - 1, 1);
        fs.writeFile(userData, JSON.stringify(parsedData), (err) => {
          if (err) {
            next(err);
          } else {
            res.status(200).send({ message: "User Deleted Successfully ..!" });
          }
        });
      } else {
        res.status(406).send({ message: "User Not Found...!" });
      }
    }
  });
});

module.exports = userRouter;
