const express=require('express');
const router=express.Router();
const {AirplaneController}=require('../../controllers');
const {AirplaneMiddleware}=require('../../middlewares');

router.post('/',
  AirplaneMiddleware.validateCreateRequest,
  AirplaneController.createAirplane
);

router.get('/',
  AirplaneController.getAirplanes
);

router.get('/:id',
  AirplaneController.getAirplane
);


router.delete('/:id',
  AirplaneController.destroyAirplane
);

router.post('/:id',
  AirplaneController.updateAirplane
);

module.exports=router