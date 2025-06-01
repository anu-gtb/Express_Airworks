'use strict';
/** @type {import('sequelize-cli').Migration} */
const {ENUMS}=require('../utils/common');
const{BOOKED,CANCELLED,INITIATED}=ENUMS.BOOKING_STATUS
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull:false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM,
        values:[BOOKED,CANCELLED,INITIATED],
        defaultValue:INITIATED,
        allowNull:false
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};