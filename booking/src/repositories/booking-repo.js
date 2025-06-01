const {StatusCodes}=require('http-status-codes');
const axios=require('axios');
const {Booking}=require('../models');
const CrudRepo=require('./crud-repo');
const {Op}=require('sequelize');
const {ENUMS}=require('../utils/common');
const{BOOKED,CANCELLED}=ENUMS.BOOKING_STATUS;
const {ServerConfig}=require('../config');
const AppError=require('../utils/errors/app-error');
const { warn } = require('winston');

class BookingRepo extends CrudRepo{
  constructor(){
    super(Booking);
  }

  async createBooking(data,transaction){
    const response=await Booking.create(data,{transaction:transaction});
    return response;
  }

  async get(data,transaction){
    const response=await Booking.findByPk(data,{transaction:transaction});
    if(!response){
      throw new AppError('Not found',StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async update(id,data,transaction){
    const response=await Booking.update(data,
      {
      where:{
        id:id
      }
    },
    {transaction:transaction}
    );
    return response;
  }

  async cancelInitiatedBooking(timestamp){
    const response=await Booking.findAll({
      where:{
        [Op.and]:[{
          createdAt:{
            [Op.lt]:timestamp
          }
      },{
        status:{
          [Op.notIn]:[BOOKED,CANCELLED]
        }
      }]
     } 
    });

    if (response.length===0){
      return {numberOfCancelledBookings:0}
    }
    
    const [noOfAffectedRows]=await Booking.update(
      {status:CANCELLED},
      {
        where:{
          createdAt:{
            [Op.lt]:timestamp
          },
          status:{
            [Op.notIn]:[BOOKED,CANCELLED]
          }
        }
      }
    );

    const seatsToReturn=new Map();
    response.forEach(booking=>{
      if(booking.flightId && booking.noOfSeats!==undefined){
        seatsToReturn.set(
          booking.flightId,
          (seatsToReturn.get(booking.flightId)||0)+booking.noOfSeats
        );
      }else{
        console.warn('missing flightId or noOfSeats');
      }
    });

    const apiCallPromises=Array.from(seatsToReturn.entries()).map(async ([flightId,noOfSeats])=>{
      try{
        if(flightId && noOfSeats!==undefined){
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${flightId}/seats`,{
        seats:noOfSeats,
        dec:0
      });
     }else{
      console.warn('invalid flightId or noOfSeats');
     }
    }catch(error){
        throw new AppError('Error updating',StatusCodes.INTERNAL_SERVER_ERROR);
      }
    });
    await Promise.all(apiCallPromises);
  }
}
 
module.exports=BookingRepo;