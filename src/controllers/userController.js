const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const store = require("../store");
const cloudinary = require("../cloudinary/cloudinary");

const userController = {
  createNewUser: async (req, res, next) => {
    try {
      let {
        email,
        password,
        fullName,
        address,
        genderId,
        roleId,
        phoneNumber,
        positionId,
      } = req.body;
      const checkEmail = (await db.User.findOne({
        where: {
          email: email,
          // attributes: {
          //   exclude: ["password"],
          // },
        },
      }))
        ? true
        : false;
      if (!checkEmail) {
        const salt = await bcrypt.genSaltSync(10);
        password = await bcrypt.hashSync(password, salt);
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: "/bookingcare/avatar",
        });
        const user = await db.User.create(
          {
            email,
            password,
            fullName,
            address,
            genderId,
            roleId,
            phoneNumber,
            positionId,
            image: image.url,
          },
          {
            plain: true,
          }
        );
        return res.status(200).json({
          success: "Create new user success",
          user,
        });
      } else {
        return res.status(500).json({
          error: "Email has already",
          errCode: 2,
        });
      }
    } catch (error) {
      return res.status(500).json("Error: " + error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const id = req.body.id;
      let user;
      if (!id) {
        return res.status(400).json({ error: "Not have id user", errCode: 1 });
      }
      if (id === "all") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      } else if (id !== "all" && Number.isInteger(id)) {
        user = await db.User.findOne({
          where: { id },
          attributes: {
            exclude: ["password"],
          },
        });
      } else {
        return res.status(400).json({ error: "id is invalid ", errCode: 2 });
      }
      return res.status(200).json({
        success: `Get user id = ${id} success`,
        user,
      });
    } catch (error) {
      return res.status(500).json("Error: " + error);
    }
  },
  updateUserById: async (req, res, next) => {
    try {
      const id = req.params.idUser;
      const user = await db.User.findOne({
        where: { id },
        raw: false,
        attributes: {
          exclude: ["password"],
        },
      });
      // const image = await cloudinary.uploader.upload(req.file.path, {
      //   folder: "/bookingcare/avatar",
      // });
      if (user) {
        for (let key in req.body) {
          if (key == "email") continue;
          user[key] = req.body[key];
        }
        // user.image = image.url;
        await user.save();

        return res
          .status(200)
          .json({ success: `update user id = ${id} success `, user });
      } else
        return res.status(400).json({ error: "not exist user", errCode: 2 });
    } catch (error) {
      return res.status(500).json(`Error: ${error}`);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const id = req.params.idUser;
      const user = await db.User.findByPk(id);
      if (!user)
        return res.status(400).json({ error: "NOt exist user", errCode: 1 });
      else await db.User.destroy({ where: { id } });
      return res.status(200).json({ success: "delete user success" });
    } catch (error) {
      return res.status(500).json(`Error: ${error}`);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Enter missing infomation", errCode: 1 });
      } else {
        const user = await db.User.findOne({
          where: {
            email: username,
          },
          attributes: ["email", "roleId", "password"], //chỉ lấy ra các trường này
        });
        if (!user)
          return res.status(400).json({ error: "Email not exist", errCode: 2 });
        await bcrypt.compare(password, user.password, async (err, result) => {
          if (result) {
            delete user.password;
            const token = await jwt.sign(
              { email: user.email, roleId: user.roleId },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "7d" }
            );
            store.push(token);
            console.log("đây là nơi lưu token: " + store);
            console.log(store.length);
            return res.status(200).json({ success: "Login success", token });
          } else
            return res
              .status(400)
              .json({ error: "Wrong password", errCode: 3 });
        });
      }
    } catch (error) {
      return res.status(500).json(`error: ${error}`);
    }
  },
  getOwnUser: async (req, res, next) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.decode.email,
        },
        attributes: ["fullName", "roleId"],
      });
      return res.status(200).json({
        success: `get user success`,
        user,
      });
    } catch (error) {
      return res.status(500).json("Error: " + error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      store.forEach((item, index) => {
        if (item == token) store.splice(index, 1);
      });
      return res.status(200).json({ success: "logout success" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

module.exports = userController;
