const express=require('express');
const apiRoutes=require('./routes');
const app=express();

PORT=3002
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',apiRoutes);

app.listen(PORT,async ()=>{
  console.log(`Server started on PORT ${PORT}`);
});
