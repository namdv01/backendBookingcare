const userRouter = require("./userRoute");
const serviceRouter = require("./serviceRoute");
const doctorRouter = require("./doctorRoute");

const routes = (app) => {
  app.use("/user", userRouter);
  app.use("/service", serviceRouter);
  app.use("/doctor", doctorRouter);
  return app;
};

module.exports = routes;
