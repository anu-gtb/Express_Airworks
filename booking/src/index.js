const express=require('express');
const {ServerConfig}=require('./config');
const app=express();
const apiRoutes=require('./routes');
const CRONS=require('./utils/common/cron-jobs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
  console.log(`Server started on ${ServerConfig.PORT}`);
  CRONS();
});