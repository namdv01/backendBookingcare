const upload = require("../cloudinary/multer");
const userController = require("../controllers/userController");
const bookingController = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/middleware");
const Router = require("express").Router();
Router.post(
  "/createNewUser",
  upload.single("image"),
  userController.createNewUser
);
Router.patch("/updateUser/:idUser", userController.updateUserById);
Router.delete("/deleteUser/:idUser", userController.deleteUserById);
Router.post("/getUser", userController.getUserById);
Router.post("/login", userController.login);
Router.get("/getOwner", verifyToken, userController.getOwnUser);
Router.get("/logout", verifyToken, userController.logout);
Router.post("/bookingSchedule", bookingController.bookSchedule);

module.exports = Router;
