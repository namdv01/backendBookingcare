const Router = require("express").Router();
const servicesController = require("../controllers/servicesController");
const middleware = require("../middleware/middleware");
const configMail = require("../email/configEmail");
const upload = require("../cloudinary/multer");
const specialistController = require("../controllers/specialistController");
const clinicController = require("../controllers/clinicController");

Router.post(
  "/createSpecialist",
  upload.single("image"),
  specialistController.createSpeacialist
);
Router.get("/getAllSpecialist", specialistController.getAllSpecialist);
Router.get("/getAllClinic", clinicController.getAllclinic);
Router.post(
  "/createClinic",
  upload.single("image"),
  clinicController.createClinic
);
Router.get("/getAllCodes/:type", servicesController.getAllCodes);
Router.get("/verifyToken", middleware.verifyToken, (req, res, next) => {
  console.log(req.decode);
  return res.status(200).json({ success: "token valid" });
});

Router.get("/getTimes", servicesController.getTimes);
Router.get("/getCodeForDoctorInfo", servicesController.getCodeForDoctorInfo);
Router.post("/sendEmail", async (req, res, next) => {
  try {
    const result = await configMail({
      mail: "19020373@vnu.edu.vn",
      subject: "Thông báo đặt lịch khám bệnh",
      content: {
        fullName: "Gia Long",
        time: "Thứ 2 ngày 29/8/2022",
        nameClinic: "Phòng khám Hoàng Thái Thịnh",
        addressClinic: "123 Xuân Thủy Cầu Giấy",
        redirectLink:
          "https://www.youtube.com/watch?v=0GL--Adfqhc&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=95",
      },
    });
    return res.status(200).json({ success: "Gửi mail thành công" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
module.exports = Router;
