const { Sequelize } = require("sequelize");
require("dotenv").config();
// const sequelize = new Sequelize(
//   "d1sr6juc2j4f53",
//   "cqkuggunrbwfjt",
//   "9820efd056d2273c452480a45e564d19228ab43dd7a705d79c8743a17028c7b9",
//   {
//     host: "ec2-52-20-166-21.compute-1.amazonaws.com",
//     dialect: "postgres",
//     operatorsAliases: 0,
//     timezone: "+07:00",
//     dialectOptions: {
//       ssl: true,
//     },
//   }
// );
// const sequelize = new Sequelize(`${process.env.DATA_HEROKU_API}`, {
//   logging: false,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: false,
//       require: true,
//     },
//   },
// });

const customConfig = {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  customConfig
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connect db successfully");
  } catch (error) {
    console.error("not connect because: " + error);
  }
};

module.exports = connectDB;
