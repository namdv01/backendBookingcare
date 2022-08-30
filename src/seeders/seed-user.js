"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User", [
      {
        email: "admin@gmail.com",
        password: "123456",
        fullName: "Đỗ Văn Nam",
        address: "Hà Nội",
        gender: true,
        roleId: "R1",
        phoneNumber: "0339501427",
        positionId: "",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
