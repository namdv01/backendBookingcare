const db = require("../models/index");
const { Op } = require("sequelize");
const servicesController = {
  getAllCodes: async (req, res, next) => {
    try {
      const type = req.params.type.toUpperCase();
      if (!type)
        return res.status(400).json({ error: "not have type", errCode: 1 });
      else {
        const codes = await db.AllCode.findAll({
          where: {
            type,
          },
        });
        return res
          .status(200)
          .json({ success: `get code type = ${type} success`, codes });
      }
    } catch (error) {
      return res.status(500).json(`Error: ${error}`);
    }
  },

  getTimes: async (req, res, next) => {
    try {
      const time = await db.AllCode.findAll({
        where: {
          type: "TIME",
        },
      });
      return res.status(200).json({ success: "get time success", time });
    } catch (error) {
      return res.status(500).json(`Error: ${error}`);
    }
  },
  getCodeForDoctorInfo: async (req, res, next) => {
    try {
      const result = await db.AllCode.findAll({
        where: {
          [Op.or]: [
            { type: "PRICE" },
            { type: "PAYMENT" },
            { type: "PROVINCE" },
          ],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).json({
        success: "get all code for doctorInfo success",
        codes: result,
      });
    } catch (error) {
      return res.status(500).json(`Error: ${error}`);
    }
  },
};

module.exports = servicesController;
