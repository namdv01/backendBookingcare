const db = require("../models");
const configMail = require("../email/configEmail");
const bookingController = {
  bookSchedule: async (req, res, next) => {
    try {
      const {
        email,
        date,
        doctorId,
        timeType,
        fullName,
        genderId,
        address,
        phoneNumber,
        reason,
        isVietNam,
        dateSchedule,
      } = req.body;
      if (!email || !date || !doctorId || !timeType)
        return res.status(400).json({ errorCode: 1, mes: "Missing field" });
      const user = await db.User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          fullName,
          genderId,
          address,
          phoneNumber,
          roleId: "R3",
        },
      });

      let booking = {};
      let b = {};
      let mail = "";
      let time = "";
      let fname = "";
      let nameClinic = "";
      let addressClinic = "";
      let redirectLink = "";
      let subject = "";
      let reasonReceiveMail = "";
      let infoSchedule = "";
      let timeTitle = "";
      let clinic = "";
      let confirmTrue = "";
      let titleDoctor = "";
      let doctor = {};
      if (user && user[0]) {
        const [day, month, year] = req.body.date.split("/");
        const dateFix = new Date(+year, month - 1, +day);
        booking = await db.Booking.create({
          statusId: "S1",
          doctorId,
          patientId: user[0].id,
          date: dateFix,
          timeType,
        });

        b = await db.Booking.findOne({
          where: {
            id: booking.id,
          },
          include: [
            {
              model: db.AllCode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });

        doctor = await db.User.findOne({
          where: {
            id: doctorId,
          },
        });

        if (isVietNam) {
          mail = email;
          titleDoctor = "Bác sĩ khám bệnh:";
          subject = "Thông báo đặt lịch khám online tại Bookingcare";
          fname = fullName;
          time = b.timeTypeData.valueVi + "," + dateSchedule;
          nameClinic = doctor.nameClinic;
          addressClinic = doctor.addressClinic;
          redirectLink = "http://google.com.vn";
          reasonReceiveMail =
            "Bạn nhận được email do đã có thông tin đặt lịch khám bệnh trên Bookingcare";
          infoSchedule = "Thông tin lịch khám bệnh gồm:";
          timeTitle = "Thời gian khám bệnh:";
          confirmTrue =
            "Nếu các thông tin trên là đúng sự thật,vui lòng click vào email bên dưới để hoàn tất thủ tục đặt lịch khám bệnh";

          clinic = "Phòng khám ";
        } else {
          mail = email;
          subject = "Notice of online appointment booking at Bookingcare";
          fname = fullName;
          titleDoctor = "Examinate Doctor:";
          time = b.timeTypeData.valueEn + "," + dateSchedule;
          nameClinic = doctor.nameClinic;
          addressClinic = doctor.addressClinic;
          redirectLink = "http://google.com.vn";
          reasonReceiveMail =
            "You received an email because you already have information to book a medical appointment on Bookingcare";
          infoSchedule =
            "Information on the medical examination schedule includes:";
          timeTitle = "Medical examination time:";
          confirmTrue =
            "If the above information is true, please click on the email below to complete the procedure to book an appointment";

          clinic = "Clinic ";
        }

        const sendEmail = await configMail({
          mail,
          subject,
          titleDoctor,
          doctor: doctor.fullName,
          content: {
            fullName: fname,
            time,
            nameClinic,
            addressClinic,
            redirectLink,
          },
          reasonReceiveMail,
          infoSchedule,
          timeTitle,
          confirmTrue,
          clinic,
        });
      }
      return res.status(200).json({
        success: "book schedule success",
        data: {
          mail,
          subject,
          content: {
            fullName: fname,
            time,
            nameClinic,
            addressClinic,
            redirectLink,
          },
          reasonReceiveMail,
          infoSchedule,
          timeTitle,
          confirmTrue,
          clinic,
        },
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

module.exports = bookingController;
