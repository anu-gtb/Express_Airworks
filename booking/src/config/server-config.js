const dotenv=require('dotenv');
dotenv.config();

module.exports={
  PORT:process.env.BOOKING_PORT,
  FLIGHT_SERVICE:process.env.FLIGHT_SERVICE
}