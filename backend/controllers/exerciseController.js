const Schedule=require(`../models/scheduleModel`);
const Exercise=require(`../models/exerciseModel`);


exports.updateExercise=async (req,res)=>{
	try{
		const updateObj=await Exercise.findByIdAndUpdate(req.body.exercise.exerciseId,{
			doneDuration:req.body.exercise.doneDuration
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
