const mongoose=require('mongoose');
const scheduleSchema=new mongoose.Schema({

	exercises:[{
     type:mongoose.Schema.Types.ObjectId,
        ref:'Exercise'	
	}],
	date:{
		type:String,
		unique:true
	},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
},{timestamps:true});
module.exports=mongoose.model('Schedule',scheduleSchema);