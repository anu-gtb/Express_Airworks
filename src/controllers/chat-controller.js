const {ChatService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');

async function chat(req,res){
  try {
    const ans=await ChatService.answer(req.body.question);
    SuccessResponse.data=ans;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error=error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports={
  chat
}