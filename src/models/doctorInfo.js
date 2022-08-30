"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorInfo.belongsTo(models.AllCode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      DoctorInfo.belongsTo(models.AllCode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
      DoctorInfo.belongsTo(models.AllCode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentData",
      });
      DoctorInfo.belongsTo(models.User, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "idInfoData",
      });
      DoctorInfo.belongsTo(models.Clinic, {
        foreignKey: "clinicId",
        targetKey: "id",
        as: "clinicData",
      });
      DoctorInfo.belongsTo(models.Specialty, {
        foreignKey: "specialtyId",
        targetKey: "id",
        as: "specialtyData",
      });
    }
  }
  DoctorInfo.init(
    {
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.TEXT,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DoctorInfo",
    }
  );
  return DoctorInfo;
};
