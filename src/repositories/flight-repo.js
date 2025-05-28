const CrudRepo=require('./crud-repo');
const {Flight,Airplane,Airports,City,Seat}=require('../models');
const {Sequelize}=require('sequelize');
const db=require('../models');
const {addRowLockOnFlights}=require('./queries');

class FlightRepo extends CrudRepo{
    constructor(){
       super(Flight);
    }

    async getAllFlights(filter){
        const response=await Flight.findAll({
            where:filter,
            include:[
            {
                model:Airplane,
                required:true,
                as:'airplane_details',
                include:{
                    model:Seat, 
                    required:true
                }
            },
            {
                model:Airports,
                required:true,
                as:'departure_airport',
                on:{
                    col1:Sequelize.where(Sequelize.col('Flight.departureId'),'=',Sequelize.col('departure_airport.code'))
                },
                include:{
                    model:City, 
                    required:true
                }
            },
            {
                model:Airports,
                required:true,
                as:'arrival_airport',
                on:{
                    col1:Sequelize.where(Sequelize.col('Flight.arrivalId'),'=',Sequelize.col('arrival_airport.code'))
                },
                include:{
                    model:City, 
                    required:true
                }
            }
        ]
        });
        return response;
    }

    async updateRemainingSeats(flightId,seats,dec=1){
        const transaction=await db.sequelize.transaction();
        try{
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight=await Flight.findByPk(flightId);
            if(dec==1){
                await flight.decrement('totalSeats',{by:seats},{transaction:transaction});
            }else{
                await flight.increment('totalSeats',{by:seats},{transaction:transaction});
            }
            await transaction.commit();
            return flight;
        }catch(error){
           await transaction.rollback();
           throw error;
        }
    }
}

module.exports=FlightRepo; 