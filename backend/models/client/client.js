const mongoose = require('mongoose');
// const {Stat} =require("./stat");
const clientSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  username: {
    type: String,
    required:true
  },
  exerciseList:{ type:[{
  	day:String,//Day of the week
  	exercises:[String]
  }],
  default:null
},
  stats:{
    type: [{type: mongoose.Schema.Types.ObjectId, ref:'Stat'}],default:null
  }
	// username:String
});
console.log("FInd");
module.exports=mongoose.model('Client', clientSchema);