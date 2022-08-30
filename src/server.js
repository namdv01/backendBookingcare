const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
// const routes = require("./routes/index");
const cors = require("cors");
const connectDB = require("./connectDB");
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes(app);
connectDB();

app.get("/", async (req, res, next) => {
  try {
    const result = await db.User.findAll({
      where: {
        roleId: "R2",
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server đã chạy tại cổng " + port);
});
