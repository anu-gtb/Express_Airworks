const {AirPlaneRepo}=require('../repositories');
const airplaneRepo=new AirPlaneRepo();
const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

async function createAirplane(data){
   try{
    const airplane=await airplaneRepo.create(data);
    return airplane;
   }catch(error){
    if(error.name==='ValidationError'){
      let explanation=[];
      error.errors.forEach((err)=>{
         explanation.push(err.message);
      });
      throw new AppError('Cannot create a new airplane object',StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new Airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirplanes(){
   try{
    const airplanes=await airplaneRepo.getAll();
    return airplanes;
   }catch(error){
    throw new AppError('Cannot fetch all',StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function getAirplane(id){
  try {
    const airplane=await airplaneRepo.get(id);
    return airplane;
  } catch (error) {
    if(error.statusCode===StatusCodes.NOT_FOUND){
      throw new AppError('Not found',error.statusCode);
    }
    throw new AppError('Cannot fetch',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function destroyAirplane(id){
  try{
    const response=await airplaneRepo.destroy(id);
    return response;
   }catch(error){
    if(error.statusCode===StatusCodes.NOT_FOUND){
      throw new AppError('Not found',error.statusCode);
    }
    throw new AppError('Cannot destroy',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAirplane(id){
  try{
    const response=await airplaneRepo.update(id);
    return response;
   }catch(error){
    if(error.statusCode===StatusCodes.NOT_FOUND){
      throw new AppError('Not found',error.statusCode);
    }
    throw new AppError('Cannot destroy',StatusCodes.INTERNAL_SERVER_ERROR);
  }
 }

module.exports={
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
}