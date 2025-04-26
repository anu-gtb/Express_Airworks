const {CityRepo}=require('../repositories');
const cityRepo=new CityRepo();
const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

async function createCity(data){
  try{
    const city=await cityRepo.create(data);
    return city;
   }catch(error){
    if(error.name==='SequelizeValidationError' || error.name==='SequelizeUniqueConstraintError'){
      let explanation=[];
      error.errors.forEach((err)=>{
         explanation.push(err.message);
      });
      throw new AppError('Cannot create a new City object',StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new City object',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCities(){
  try{
   const cities=await cityRepo.getAll();
   return cities;
  }catch(error){
   throw new AppError('Cannot fetch all',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCity(id){
 try {
   const city=await cityRepo.get(id);
   return city;
 } catch (error) {
   if(error.statusCode===StatusCodes.NOT_FOUND){
     throw new AppError('Not found',error.statusCode);
   }
   throw new AppError('Cannot fetch',StatusCodes.INTERNAL_SERVER_ERROR);
 }
}

async function destroyCity(id){
 try{
   const response=await cityRepo.destroy(id);
   return response;
  }catch(error){
   if(error.statusCode===StatusCodes.NOT_FOUND){
     throw new AppError('Not found',error.statusCode);
   }
   throw new AppError('Cannot destroy',StatusCodes.INTERNAL_SERVER_ERROR);
 }
}

async function updateCity(id,data){
  try{
    const response=await cityRepo.update(id,data);
    return response;
   }catch(error){
    if(error.statusCode===StatusCodes.NOT_FOUND){
      throw new AppError('Not found',error.statusCode);
    }
    throw new AppError('Cannot update',StatusCodes.INTERNAL_SERVER_ERROR);
  }
 }
 
module.exports={
  createCity,
  getCities,
  getCity,
  destroyCity,
  updateCity
}