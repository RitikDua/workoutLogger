
require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter=require('./routes/userRoutes');
const scheduleRouter=require('./routes/scheduleRoutes');
const exerciseRouter=require('./routes/exerciseRoutes');
const statsRouter=require('./routes/statsRoutes');
const cors=require("cors");
const mongoose=require('mongoose');
app.use((request,response,next)=>{
	response.header("Access-Control-Allow-Origin", "http://localhost:4200");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	response.header("Access-Control-Allow-Credentials", "true");
	response.header('Access-Control-Allow-Methods',"GET","POST","PATCH","DELETE");
	if(request.method==='OPTIONS')
		return response.status(200).json({status:'success'});
	next();
});
// app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

const connect=mongoose.connect("mongodb://localhost:27017/workoutLogger",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true,useFindAndModify: false }).then((db)=>{
	console.log("Database created");
},(err)=>console.log(err));


app.use('/',userRouter);
app.use('/schedule',scheduleRouter);

app.use('/exercise',exerciseRouter);
app.use('/stats',statsRouter);

app.listen(3000,()=>{
	console.log("Listen on 3000");
});
