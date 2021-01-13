const Schedule=require(`../models/scheduleModel`);
const Exercise=require(`../models/exerciseModel`);
const mongoose=require("mongoose")

exports.updateExercise=async (req,res)=>{
	try{
		console.log(req.body)
		const updateObj=await Exercise.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.exercise.exerciseId),{
			doneDuration:parseInt(req.body.exercise.doneDuration)
		})
		console.log(updateObj)
		res.status(200).json({exercise:updateObj})
	}
	catch(err){
		console.log(err);
		res.status(500).json({
			msg:err
		})
	}
}
