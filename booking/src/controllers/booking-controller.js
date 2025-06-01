const{BookingService}=require('../services');
const{SuccessResponse,ErrorResponse}=require('../utils/common');
const {StatusCodes}=require('http-status-codes');
const inMemDb={};

async function createBooking(req,res){
  try {
    const idempotencyKey=req.headers['x-idempotency-key'];
    if(!idempotencyKey){
      return res.status(StatusCodes.BAD_REQUEST).json({message:'idempotency key missing'});
    }
    if(!idempotencyKey || inMemDb[idempotencyKey]){
      return res.status(StatusCodes.BAD_REQUEST).json({message:'Cannot retry on a successful pay'});
    } 
    const response=await BookingService.createBooking({
      flightId:req.body.flightId,
      userId:req.body.userId,
      noOfSeats:req.body.noOfSeats
    });
    inMemDb[idempotencyKey]=idempotencyKey;
    SuccessResponse.data=response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error=error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function makePayment(req,res){
  try {
    const idempotencyKey=req.headers['x-idempotency-key'];
    if(!idempotencyKey){
      return res.status(StatusCodes.BAD_REQUEST).json({message:'idempotency key missing'});
    }
    if(!idempotencyKey || inMemDb[idempotencyKey]){
      return res.status(StatusCodes.BAD_REQUEST).json({message:'Cannot retry on a successful pay'});
    } 
    const response=await BookingService.makePayment({
      userId:req.body.userId,
      bookingId:req.body.bookingId,
      totalCost:req.body.totalCost
    });
    inMemDb[idempotencyKey]=idempotencyKey;
    SuccessResponse.data=response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error=error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function cancelBooking(req,res){
  try {
    const idempotencyKey=req.headers['x-idempotency-key'];
    if(!idempotencyKey){
      return res.status(StatusCodes.BAD_REQUEST).json({message:'idempotency key missing'});
    }
    if(!idempotencyKey || inMemDb[idempotencyKey]){
      return res.status(StatusCodes.BAD_REQUEST).json({message:'Cannot retry on a successful pay'});
    } 
    const response=await BookingService.cancelBooking({
      bookingId:req.body.bookingId,
      userId:req.body.userId
    });
    inMemDb[idempotencyKey]=idempotencyKey;
    SuccessResponse.data=response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error=error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports={
  createBooking,
  makePayment,
  cancelBooking
}