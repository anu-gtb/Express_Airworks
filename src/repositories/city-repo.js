const CrudRepo=require('./crud-repo');
const {City}=require('../models');

class CityRepo extends CrudRepo{
    constructor(){
       super(City);
    }
}

module.exports=CityRepo;