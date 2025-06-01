const axios=require('axios');
const {BookingRepo}=require('../repositories');
const db=require('../models');
const {ServerConfig}=require('../config');
const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');
const bookingRepo=new BookingRepo;
const {ENUMS}=require('../utils/common');
const {BOOKED,CANCELLED}=ENUMS.BOOKING_STATUS

async function createBooking(data){
  const transaction=await db.sequelize.transaction();
  // return new Promise((resolve,reject)=>{
  //   const result=db.sequelize.transaction(async function bookingImpl(t){
  try{
      const flight=await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
      
      const flightData=flight.data.data;
      
      if(data.noOfSeats>flightData.totalSeats){
        throw new AppError('Not enough seats',StatusCodes.BAD_REQUEST);
      }
      
      const totalBillAmount=data.noOfSeats*flightData.price;
      console.log(totalBillAmount);
      
      const bookingPayload={...data,totalCost:totalBillAmount};

      const booking=await bookingRepo.createBooking(bookingPayload);

      await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
        seats:data.noOfSeats
      });
      
      await transaction.commit();
      return booking;
  }catch(error){
    await transaction.rollback();
    throw error;
  }
  //   });
  // })
}

async function makePayment(data) {
  const transaction=await db.sequelize.transaction();
  try {
    const bookingDetails=await bookingRepo.get(data.bookingId,transaction);
    if(bookingDetails.status==CANCELLED){
      throw new AppError('Booking expired',StatusCodes.BAD_REQUEST);
    }
    // const bookingTime=new Date(bookingDetails.createdAt);
    // const currentTime=new Date();
    
    // if(currentTime-bookingTime>300000){
    //   await cancelBooking(data.bookingId);
    //   throw new AppError('Booking expired',StatusCodes.BAD_REQUEST);
    // }
    if(bookingDetails.totalCost!=data.totalCost){
       throw new AppError('The amount does not match',StatusCodes.BAD_REQUEST);
    }
    if(bookingDetails.userId!=data.userId){
       throw new AppError('The user does not match',StatusCodes.BAD_REQUEST);
    }
    const response=await bookingRepo.update(data.bookingId,{status:BOOKED},transaction);
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelBooking(data){
  const transaction=await db.sequelize.transaction();
  try{
    const bookingDetails=await bookingRepo.get(data.bookingId,transaction);
    if(bookingDetails.userId!=data.userId){
       throw new AppError('The user does not match',StatusCodes.BAD_REQUEST);
    }
    if(bookingDetails.status==CANCELLED){
      await transaction.rollback();
      return true;
    }else{
      const response=await bookingRepo.update(data.bookingId,{status:CANCELLED},transaction);
      await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`,{
        seats:bookingDetails.noOfSeats,
        dec:0
      });
      await transaction.commit();
      return response;
    }
  }catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelInitiatedBooking(){
  try {
    const currentTime=new Date(Date.now()-1000*300);
    const response=await bookingRepo.cancelInitiatedBooking(currentTime);
    return response;
  } catch (error) {
    throw error;  
  }
}

module.exports={
  createBooking,
  makePayment,
  cancelBooking,
  cancelInitiatedBooking
}