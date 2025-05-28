const express=require('express');
const {ServerConfig}=require('./config');
const apiRoutes=require('./routes');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,async ()=>{
  console.log(`Server started on PORT ${ServerConfig.PORT}`);
  //Logger.info('Successfully started server');
  // const {City,Airports}=require('./models');
  // const goa=await City.findByPk(2);
  // const hbairport=await goa.createAirport({name:'Huballi Airport',code:'HBL'});
  // const airportsInGoa=await goa.getAirports();
  // console.log(airportsInGoa);
  // const hbairport=await Airports.findByPk(2);
  // await goa.removeAirports(hbairport);
  // const airportsInGoa=await goa.getAirports();
  // console.log(airportsInGoa);
  // await City.destroy({
  //   where:{
  //     id:1
  //   }
  // });
});
