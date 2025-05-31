const express=require('express');
const router=express.Router();
const {ChatController}=require('../../controllers');

router.get('/',
  ChatController.chat
)

module.exports=router;