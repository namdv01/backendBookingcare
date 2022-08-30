const db = require("../models/index");
const cloudinary = require("../cloudinary/cloudinary");

const clinicController = {
  createClinic: async (req, res, next) => {
    try {
      const { name, description, address } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "/bookingcare/clinic",
      });
      const clinic = await db.Clinic.create(
        {
          name,
          address,
          description,
          image: image.url,
        },
        {
          plain: true,
        }
      );
      return res.status(200).json({ success: "create new clinic", clinic });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  getAllclinic: async (req, res, next) => {
    try {
      const result = await db.Clinic.findAll();
      return res
        .status(200)
        .json({ success: "get all clinic success", clinic: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

module.exports = clinicController;
