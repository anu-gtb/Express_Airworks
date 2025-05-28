'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
        as:'airplane_details'
      });
      this.belongsTo(models.Airports,{
        foreignKey:'departureId',
        as:'departure_airport'
      });
      this.belongsTo(models.Airports,{
        foreignKey:'arrivalId',
        as:'arrival_airport'
      });
    }
  }
  Flight.init({
    flightNumber: {
      type:DataTypes.STRING,
      allowNull:false
    },
    airplaneId: {
      type:DataTypes.STRING,
      allowNull:false
    },
    departureId: {
      type:DataTypes.STRING,
      allowNull:false
    },
    arrivalId: {
      type:DataTypes.STRING,
      allowNull:false
    },
    departureTime: {
      type:DataTypes.STRING,
      allowNull:false
    },
    arrivalTime: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price: {
      type:DataTypes.STRING,
      allowNull:false
    },
    boardingGate: {
      type:DataTypes.STRING,
    },
    totalSeats: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};