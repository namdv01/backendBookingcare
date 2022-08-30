"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AllCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AllCode.hasMany(models.User, {
        foreignKey: "positionId",
        as: "positionData",
      });
      AllCode.hasMany(models.User, {
        foreignKey: "genderId",
        as: "genderData",
      });
      AllCode.hasMany(models.User, {
        foreignKey: "roleId",
        as: "roleData",
      });
      AllCode.hasMany(models.Schedule, {
        foreignKey: "doctorId",
        as: "timeData",
      });
      AllCode.hasMany(models.DoctorInfo, {
        foreignKey: "priceId",
        as: "priceData",
      });
      AllCode.hasMany(models.DoctorInfo, {
        foreignKey: "provinceId",
        as: "provinceData",
      });
      AllCode.hasMany(models.DoctorInfo, {
        foreignKey: "paymentId",
        as: "paymentData",
      });
      AllCode.hasMany(models.Booking, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });
    }
  }
  AllCode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AllCode",
    }
  );
  return AllCode;
};
