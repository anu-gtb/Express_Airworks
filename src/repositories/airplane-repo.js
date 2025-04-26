const CrudRepo=require('./crud-repo');
const {Airplane}=require('../models');

class AirplaneRepo extends CrudRepo{
    constructor(){
       super(Airplane);
    }
}

module.exports=AirplaneRepo;