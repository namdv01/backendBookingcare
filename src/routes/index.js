const userRoute = require("./userRoute");
const serviceRoute = require("./serviceRoute");
const doctorRoute = require("./doctorRoute");

const routes = (app) => {
  app.use("/user", userRoute);
  app.use("/service", serviceRoute);
  app.use("/doctor", doctorRoute);
  // app.use()
};

module.exports = routes;
