const route = require("express").Router();
// const doctorController = require("../controllers/doctorController");

// route.get("/getAllDoctors", doctorController.getAllDoctor);
route.get("/test", (req, res, next) => {
  return res.status(200).json("ok binhf thuong");
});
// route.get("/getDoctors/:limit", doctorController.getDoctor);
// route.post("/getDoctorInfo", doctorController.getDoctorInfo);
// route.post("/postDetailDoctor", doctorController.postDetailDoctor);
// route.get("/doctorDetail/:idDoctor", doctorController.getDetailDoctor);
// route.post("/bulkSchedule", doctorController.postBulkSchedule);
// route.get("/getScheduleDoctor/:idDoctor", doctorController.getScheduleDoctor);
// route.post("/getScheduleOndayDoctor", doctorController.getScheduleOnDayDoctor);

module.exports = route;
