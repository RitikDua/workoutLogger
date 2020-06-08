const mongoose=require("mongoose");
const todaySchema = new mongoose.Schema({
 userId:{
 	type:String,
 	unique:true
 },
  exerciseName:{
  type:String,//exercise Name
  },
  exercise:{
  	sets:{
  		type:Number,default:null},
  	reps:{
  		type:Number,default:null},
  	hrs:{
  		type:Number,default:null},
  	mins:{
  		type:Number,default:null},
  }
  
});
module.exports=mongoose.model("TodayStat",todaySchema);