const express=require('express');
const router=express.Router();
const {CityController}=require('../../controllers');
const {CityMiddleware}=require('../../middlewares');

router.post('/',
  CityMiddleware.validateCreateRequest,
  CityController.createCity
);

router.get('/',
 CityController.getCities
);

router.get('/:id',
  CityController.getCity
);

router.delete('/:id',
  CityController.destroyCity
);

router.post('/:id',
  CityController.updateCity
);

module.exports=router;