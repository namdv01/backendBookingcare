const userRoute = require("./userRoute");
const serviceRoute = require("./serviceRoute");
const doctorRoute = require("./doctorRoute");
const route = require("express").Router();

function routes(app) {
  app.use("/user", userRoute);
  app.use("/service", serviceRoute);
  app.use("/doctor", doctorRoute);
}

module.exports = routes;
