const mongoose=require('mongoose');
const exerciseSchema=new mongoose.Schema({
    name:String,
    reqDuration:Number,
    doneDuration:{
    	type:Number,default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
},{timestamps:true});
module.exports=mongoose.model('Exercise', exerciseSchema);