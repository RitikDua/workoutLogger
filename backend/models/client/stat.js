

const mongoose = require('mongoose');


const statSchema = new mongoose.Schema({
  userId:{
    type:String,
  },
  date:{
    type:String,
    unique:true},
  weight:Number,
  height:Number,
  todayStats:{
          type:[
                {type: mongoose.Schema.Types.ObjectId, 
                  ref:'todayStat'}]
          ,default:null}
});

module.exports=mongoose.model("Stat",statSchema);
