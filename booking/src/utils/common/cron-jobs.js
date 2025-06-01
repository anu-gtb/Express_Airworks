const cron=require('node-cron');
const {BookingService}=require('../../services');

function scheduleCrons(){
  cron.schedule('*/2 * * * *',async ()=>{
    const response=await BookingService.cancelInitiatedBooking();
    return response;
  });
}

module.exports=scheduleCrons;