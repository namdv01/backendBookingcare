const express = require("express");
const app = express();
// const routes = require("./routes/index");
const cors = require("cors");
const connectDB = require("./connectDB");
const dotenv = require("dotenv").config();
const db = require("./models/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes(app);
connectDB();

app.get("/testdoctor", async (req, res, next) => {
  try {
    const result = await db.User.findAll({
      where: {
        roleId: "R2",
      },
    });
    return res.status(200).json({ success: "test db ok", result });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.get("/", (req, res, next) => {
  return res.status(200).json("chayj ddc");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server đã chạy tại cổng " + port);
});
