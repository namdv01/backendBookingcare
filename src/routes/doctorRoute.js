const Router = require("express").Router();
const doctorController = require("../controllers/doctorController");

Router.get("/getAllDoctors", doctorController.getAllDoctor);
// Router.get("/getDoctors/:limit", doctorController.getDoctor);
// Router.post("/getDoctorInfo", doctorController.getDoctorInfo);
// Router.post("/postDetailDoctor", doctorController.postDetailDoctor);
// Router.get("/doctorDetail/:idDoctor", doctorController.getDetailDoctor);
// Router.post("/bulkSchedule", doctorController.postBulkSchedule);
// Router.get("/getScheduleDoctor/:idDoctor", doctorController.getScheduleDoctor);
// Router.post("/getScheduleOndayDoctor", doctorController.getScheduleOnDayDoctor);

module.exports = Router;
