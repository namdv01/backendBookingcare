const db = require("../models");

const doctorController = {
  getDoctor: async (req, res, next) => {
    try {
      const limit = req.params.limit;
      const doctors = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        limit,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.AllCode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.AllCode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.AllCode,
            as: "roleData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      return res
        .status(200)
        .json({ success: `get limit ${limit} doctor success`, doctors });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getAllDoctor: async (req, res, next) => {
    try {
      const doctors = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Markdown,
            as: "idData",
            attributes: ["contentHTML", "contentMarkdown", "description"],
          },
          {
            model: db.DoctorInfo,
            as: "idInfoData",
            attributes: [
              "priceId",
              "provinceId",
              "paymentId",
              "specialtyId",
              "clinicId",
              "nameClinic",
              "addressClinic",
              "note",
              "count",
            ],
            include: [
              {
                model: db.AllCode,
                as: "priceData",
                attributes: ["valueVi", "valueEn"],
              },
              {
                model: db.AllCode,
                as: "provinceData",
                attributes: ["valueVi", "valueEn"],
              },
              {
                model: db.AllCode,
                as: "paymentData",
                attributes: ["valueVi", "valueEn"],
              },
              {
                model: db.Specialty,
                as: "specialtyData",
                attributes: ["id", "name", "description"],
              },
              {
                model: db.Clinic,
                as: "clinicData",
                attributes: ["id", "name", "address", "description", "image"],
              },
            ],
            raw: true,
            nest: true,
          },
        ],
        raw: true,
        nest: true,
      });
      console.log(doctors);
      return res
        .status(200)
        .json({ success: "get all doctors success", doctors });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  // postDetailDoctor: async (req, res, next) => {
  //   try {
  //     const body = req.body;
  //     const { doctorId } = body;
  //     let md, di;
  //     const markdown = {
  //       doctorId,
  //       contentHTML: body.contentHTML,
  //       contentMarkdown: body.contentMarkdown,
  //       description: body.description,
  //     };
  //     const info = {
  //       doctorId,
  //       priceId: body.priceId,
  //       provinceId: body.provinceId,
  //       specialtyId: body.specialtyId,
  //       clinicId: body.clinicId,
  //       paymentId: body.paymentId,
  //       addressClinic: body.addressClinic,
  //       nameClinic: body.nameClinic,
  //       note: body.note,
  //     };
  //     console.log(info);
  //     const doctor = await db.Markdown.findOne({
  //       where: {
  //         doctorId,
  //       },
  //       raw: false,
  //     });
  //     if (doctor) {
  //       for (let key in markdown) {
  //         if (key == "doctorId") continue;
  //         doctor[key] = markdown[key];
  //       }
  //       await doctor.save();
  //     } else {
  //       md = await db.Markdown.create(markdown, { plain: true });
  //     }

  //     const doctor2 = await db.DoctorInfo.findOne({
  //       where: {
  //         doctorId: doctorId.toString(),
  //       },
  //       raw: false,
  //     });
  //     if (doctor2) {
  //       for (let key in info) {
  //         if (key == "doctorId") continue;
  //         doctor2[key] = info[key];
  //       }
  //     } else {
  //       di = await db.DoctorInfo.create(info, { plain: true });
  //     }

  //     return res.status(200).json({
  //       success: "post detail doctor success",
  //       markdown: doctor ? doctor : md,
  //       doctorInfo: doctor2 ? doctor2 : di,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ error });
  //   }
  // },

  // getDetailDoctor: async (req, res, next) => {
  //   try {
  //     const idDoctor = req.params.idDoctor;
  //     const doctor = await db.User.findOne({
  //       where: {
  //         id: idDoctor,
  //       },
  //       attributes: {
  //         exclude: ["password"],
  //       },
  //       include: [
  //         {
  //           model: db.AllCode,
  //           as: "positionData",
  //           attributes: ["valueEn", "valueVi"],
  //         },
  //         {
  //           model: db.AllCode,
  //           as: "genderData",
  //           attributes: ["valueEn", "valueVi"],
  //         },
  //         {
  //           model: db.AllCode,
  //           as: "roleData",
  //           attributes: ["valueEn", "valueVi"],
  //         },
  //         {
  //           model: db.Markdown,
  //           as: "idData",
  //           attributes: ["contentHTML", "contentMarkdown", "description"],
  //         },
  //       ],
  //       raw: true,
  //       nest: true,
  //     });
  //     return res
  //       .status(200)
  //       .json({ success: `get detail doctor ${idDoctor} success`, doctor });
  //   } catch (error) {
  //     return res.status(500).json({ error });
  //   }
  // },
  // postBulkSchedule: async (req, res, next) => {
  //   try {
  //     const data = req.body.data.map((item) => {
  //       const [day, month, year] = item.date.split("/");
  //       const date = new Date(+year, month - 1, +day);
  //       return { ...item, date };
  //     });
  //     console.log(data);

  //     const oldSchedule = await db.Schedule.findAll({
  //       attributes: ["doctorId", "timeType", "date"],
  //     });
  //     const newData = data.filter(
  //       (i1) =>
  //         !oldSchedule.some(
  //           (i2) =>
  //             i1.doctorId == i2.doctorId &&
  //             i1.timeType == i2.timeType &&
  //             i1.date.toString() == i2.date.toString()
  //         )
  //     );

  //     const result = await db.Schedule.bulkCreate(newData, {
  //       returning: true,
  //     });
  //     return res.status(200).json({
  //       success: "post bulk schedule success",
  //       schedule: result,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ error });
  //   }
  // },
  // getScheduleDoctor: async (req, res, next) => {
  //   try {
  //     const doctorId = req.params.idDoctor;
  //     const result = await db.Schedule.findAll({
  //       where: {
  //         doctorId,
  //       },
  //       // attributes: {
  //       //   ["date"]
  //       //   // exclude: ["createdAt", "updatedAt"],
  //       // },
  //       attributes: ["date"],
  //       group: ["date"],
  //       raw: true,
  //     });
  //     return res.status(200).json({
  //       success: `get schedule doctor ${doctorId} success`,
  //       schedule: result,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ error });
  //   }
  // },

  // getScheduleOnDayDoctor: async (req, res, next) => {
  //   try {
  //     const doctorId = req.body.idDoctor;
  //     const day = req.body.day;
  //     const result = await db.Schedule.findAll({
  //       where: {
  //         doctorId,
  //         date: day,
  //       },
  //       attributes: {
  //         exclude: ["createdAt", "updatedAt"],
  //       },
  //       include: [
  //         {
  //           model: db.AllCode,
  //           as: "timeData",
  //           attributes: ["valueEn", "valueVi"],
  //         },
  //       ],
  //       raw: true,
  //       nest: true,
  //     });
  //     return res.status(200).json({
  //       success: `get schedule on day ${day} doctor ${doctorId} success`,
  //       schedule: result,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ error });
  //   }
  // },
  // getDoctorInfo: async (req, res, next) => {
  //   try {
  //     const id = req.body.doctorId;
  //     const result = await db.DoctorInfo.findOne({
  //       where: {
  //         doctorId: id.toString(),
  //       },
  //       include: [
  //         {
  //           model: db.AllCode,
  //           as: "priceData",
  //           attributes: ["valueEn", "valueVi"],
  //         },
  //         {
  //           model: db.AllCode,
  //           as: "provinceData",
  //           attributes: ["valueEn", "valueVi"],
  //         },
  //         {
  //           model: db.AllCode,
  //           as: "paymentData",
  //           attributes: ["valueEn", "valueVi"],
  //         },
  //       ],
  //       raw: true,
  //       nest: true,
  //     });
  //     return res
  //       .status(200)
  //       .json({ success: "get doctor info success", id, result });
  //   } catch (error) {}
  // },
};

module.exports = doctorController;
