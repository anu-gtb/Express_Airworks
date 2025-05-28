const express=require('express');
const router=express.Router(); 
const airplaneRouter=require('./airplane-routes');
const cityRouter=require('./city-routes');
const FlightRouter=require('./flight-routes');
const airportRouter=require('./airport-routes')

router.use('/airplanes',airplaneRouter);
router.use('/cities',cityRouter);
router.use('/airports',airportRouter);
router.use('/flights',FlightRouter);

module.exports=router;