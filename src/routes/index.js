const userRoute = require("./userRoute");
const serviceRoute = require("./serviceRoute");
const doctorRoute = require("./doctorRoute");
const route = require("express").Router();
const db = require("../models");

function routes(app) {
  app.use("/user", userRoute);
  app.use("/service", serviceRoute);
  app.use("/doctor", doctorRoute);
  app.use(
    "/test",
    route.get("/x", (req, res, next) => {
      return res.json("ko sao ca");
    })
  );
  // app.use()
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
}

module.exports = routes;
