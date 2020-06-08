

const mongoose = require('mongoose');


const statSchema = new mongoose.Schema({
  
  date:String,
  weight:Number,
  height:Number,
  todayStats:{
          type:[{type: mongoose.Schema.Types.ObjectId, ref:'todayStat'}]
          ,default:null}
});

module.exports=mongoose.model("Stat",statSchema);
