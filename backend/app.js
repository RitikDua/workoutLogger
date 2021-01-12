
require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter=require('./routes/userRoutes');
const scheduleRouter=require('./routes/scheduleRoutes');
const exerciseRouter=require('./routes/exerciseRoutes');

const mongoose=require('mongoose');

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

const connect=mongoose.connect("mongodb://localhost:27017/workoutLogger",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true}).then((db)=>{
	console.log("Database created");
},(err)=>console.log(err));


app.use('/',userRouter);
app.use('/schedule',scheduleRouter);

app.use('/exercise',exerciseRouter);

app.listen(3000,()=>{
	console.log("Listen on 3000");
});
