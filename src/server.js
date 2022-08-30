const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const routes = require("./routes");
const cors = require("cors");
const connectDB = require("./connectDB");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();
routes(app);
// app.use(
//   "/doctor",
//   route.get("/x", async (req, res, next) => {
//     try {
//       const result = await db.User.findAll({
//         where: {
//           roleId: "R2",
//         },
//       });
//       return res.status(200).json(result);
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   })
// );
// app.get("/", async (req, res, next) => {
//   try {
//     const result = await db.User.findAll({
//       where: {
//         roleId: "R2",
//       },
//     });
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server đã chạy tại cổng " + port);
});
