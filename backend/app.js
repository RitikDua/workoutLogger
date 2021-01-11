

require("dotenv").config();

const morgan=require("morgan");
const express=require("express");
const mongoose=require("mongoose");
const crypto=require("crypto");
// const path=require("path");
const app=express();
const cors = require("cors");
// const logger=require("logger");
const auth = require('./routes/routes');
const bodyParser = require('body-parser');

const passport=require("passport");
require("./models/User");

// const Test=mongoose.model("Test");
// const Child=mongoose.model("Child");


require("./config");
const login=require("./controllers/login");
const signup=require("./controllers/signup");

const api=require("./api/api");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(logger("dev"));
// app.use(express.urlencoded({extended:false}));
app.use(passport. initialize());
app.listen(3000,()=>{
	console.log("Listen on 3000");
});

const connect=mongoose.connect("mongodb://localhost:27017/workoutLogger",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true}).then((db)=>{
	console.log("Db created");
},(err)=>console.log(err));
// app.use('/', apiRouter);

// app.post("/",(req,res)=>res.send("jh"))

app.post("/signup",signup);
app.post("/login",login)
app.use("/api",auth,api);
app.use((err,req,res,next)=>{
	if(err.name==="UnauthorizedError"){
		res.status(401).json({"message":err.name+": "+err.message});
	}
})


// console.log(process.env.JWT_SECRET);
