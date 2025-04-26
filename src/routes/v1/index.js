const express=require('express');
const router=express.Router(); 
const airplaneRouter=require('./airplane-routes');
const cityRouter=require('./city-routes');

router.use('/airplanes',airplaneRouter);
router.use('/cities',cityRouter);

module.exports=router;