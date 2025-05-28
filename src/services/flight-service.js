const {FlightRepo}=require('../repositories');
const flightRepo=new FlightRepo();
const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');
const {Op}=require('sequelize');

async function createFlight(data){
   try{
    const flight=await flightRepo.create(data);
    return flight;
   }catch(error){
    if(error.name==='ValidationError'){
      let explanation=[];
      error.errors.forEach((err)=>{
         explanation.push(err.message);
      });
      throw new AppError('Cannot create a new flight object',StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new Flight object',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllFlights(query){
  let customFilter={};
  const endingTime='23:59:00';
  if(query.trips){
    [departureId,arrivalId]=query.trips.split('-');
    customFilter.departureId=departureId;
    customFilter.arrivalId=arrivalId;
  }
  if(query.price){
    [minPrice,maxPrice]=query.price.split('-');
    customFilter.price={
      [Op.between]:[minPrice,((maxPrice===undefined)?20000:maxPrice)]
    }
  }
  if(query.travellers){
    customFilter.totalSeats={
      [Op.gte]:query.travellers
    }
  }
  if(query.tripDate){
    customFilter.departureTime={
      [Op.between]:[query.tripDate,query.tripDate+endingTime]
    }
  }
  try {
    const flights=await flightRepo.getAllFlights(customFilter);
    return flights;
  } catch (error) {
    throw new AppError('Cannot fetch flights',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getFlight(id){
  try {
    const flight=await flightRepo.get(id);
    return flight;
  } catch (error) {
    if(error.statusCode===StatusCodes.NOT_FOUND){
      throw new AppError('Not found',error.statusCode);
    }
    throw new AppError('Cannot fetch',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateSeats(data){
  try {
    const response=await flightRepo.updateRemainingSeats(data.flightId,data.seats,data.dec);
    return response;
  } catch (error) {
    throw new AppError('Cannot update',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports={
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
}