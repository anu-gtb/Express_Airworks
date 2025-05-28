const CrudRepo=require('./crud-repo');
const {Airports}=require('../models');

class AirportRepo extends CrudRepo{
    constructor(){
       super(Airports);
    }
}

module.exports=AirportRepo;