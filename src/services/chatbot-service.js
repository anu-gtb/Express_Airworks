const {GoogleGenAI}=require('@google/genai');
const {ServerConfig}=require('../config');
const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const ai=new GoogleGenAI({apiKey:ServerConfig.GEMINI_API_KEY});

async function answer(prompt){
  try{
    const response=await ai.models.generateContent({
      model:'gemini-2.0-flash',
      contents:`Explain all the necessary airline instructions and rules to the customer about ${prompt} and give all the necessary information.`
    });
    return response.text;
  }catch(error){
    throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports={
  answer
}