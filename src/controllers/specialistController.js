const db = require("../models");
const cloudinary = require("../cloudinary/cloudinary");

const specialistController = {
  createSpeacialist: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "/bookingcare/specialist",
      });
      const specialist = await db.Specialty.create(
        {
          name,
          description,
          image: image.url,
        },
        {
          plain: true,
        }
      );
      return res
        .status(200)
        .json({ success: "create new specialist", specialist });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  getAllSpecialist: async (req, res, next) => {
    try {
      const result = await db.Specialty.findAll();
      return res
        .status(200)
        .json({ success: "get all specialist success", specialist: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

module.exports = specialistController;
