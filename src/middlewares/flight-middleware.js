const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
const AppError=require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
  if(!req.body.flightNumber){
     ErrorResponse.message='Something went wrong';
     ErrorResponse.error=new AppError(['Flight No.  not found'],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(!req.body.airplaneId){
     ErrorResponse.message='Something went wrong';
     ErrorResponse.error=new AppError(['Airplane not found'],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(!req.body.departureId){
     ErrorResponse.message='Something went wrong';
     ErrorResponse.error=new AppError(['Departure not found'],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(!req.body.arrivalId){
     ErrorResponse.message='Something went wrong';
     ErrorResponse.error=new AppError(['Arrival not found'],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(!req.body.departureTime){
     ErrorResponse.message='Something went wrong';
     ErrorResponse.error=new AppError(['Departure time not found'],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(!req.body.arrivalTime){
     ErrorResponse.message='Something went wrong';
     ErrorResponse.error=new AppError(['Arrival time not found'],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if(!req.body.price){
     ErrorResponse.message='Something went wrong';
     ErrorResponse.error=new AppError(['Price not found'],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateSeatsUpdateRequest(req,res,next){
  if(!req.body.seats){
     ErrorResponse.message='Something went wrong';
     ErrorResponse.error=new AppError(['Seats not found'],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports={
  validateCreateRequest,
  validateSeatsUpdateRequest
}