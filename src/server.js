const express = require("express");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
const connectDB = require("./connectDB");
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

routes(app);
connectDB();

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log("server đã chạy tại cổng " + port);
});
