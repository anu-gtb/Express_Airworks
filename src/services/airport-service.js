const {AirportRepo}=require('../repositories');
const airportRepo=new AirportRepo();
const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

async function createAirport(data){
   try{
    const airport=await airportRepo.create(data);
    return airport;
   }catch(error){
    if(error.name==='ValidationError'){
      let explanation=[];
      error.errors.forEach((err)=>{
         explanation.push(err.message);
      });
      throw new AppError('Cannot create a new airport object',StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new Airport object',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirports(){
   try{
    const airports=await airportRepo.getAll();
    return airports;
   }catch(error){
    throw new AppError('Cannot fetch all',StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function getAirport(id){
  try {
    const airport=await airportRepo.get(id);
    return airport;
  } catch (error) {
    if(error.statusCode===StatusCodes.NOT_FOUND){
      throw new AppError('Not found',error.statusCode);
    }
    throw new AppError('Cannot fetch',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function destroyAirport(id){
  try{
    const response=await airportRepo.destroy(id);
    return response;
   }catch(error){
    if(error.statusCode===StatusCodes.NOT_FOUND){
      throw new AppError('Not found',error.statusCode);
    }
    throw new AppError('Cannot destroy',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAirport(id){
  try{
    const response=await airportRepo.update(id);
    return response;
   }catch(error){
    if(error.statusCode===StatusCodes.NOT_FOUND){
      throw new AppError('Not found',error.statusCode);
    }
    throw new AppError('Cannot destroy',StatusCodes.INTERNAL_SERVER_ERROR);
  }
 }

module.exports={
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
}