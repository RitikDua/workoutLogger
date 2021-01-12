const Schedule=require(`../models/scheduleModel`);
const Exercise=require(`../models/exerciseModel`);

exports.getTodaySchedule=async(req,res)=>{
	try{
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	
		console.log(startOfToday);
		const schedule=await Schedule.findOne({
				updatedAt : {
				    '$gte': startOfToday,
				    
				},
				user:req.user._id
		}).populate("exercises")
		console.log(schedule)

		res.status(200).json({
			schedule:schedule
		})
	
	}
	catch(err){
		res.status(500).json({
			msg:err
		})
	}

}

exports.createTodaySchedule=async(req,res)=>{
	try{
		let arr=[],list=[];
		const todayGoals=req.body.todayGoals;
		console.log(todayGoals)
		await Promise.all(todayGoals.map(async (goal)=>{
			const {name,reqDuration}=goal;
			const exercise=await Exercise.create({name,reqDuration,user:req.user._id});
			arr.push(exercise._id);
		}))
		const schedule=await Schedule.create({user:req.user._id,exercises:arr})
		res.status(200).json({
			schedule:schedule
		})
	
	}
	catch(err){
		console.log(err)
		res.status(500).json({
			msg:err
		})
	}

}

exports.updateSchedule=async (req,res)=>{
	try{
		const updateObj=req.body
		res.status(200).json({})
	}
	catch(err){
		res.status(500).json({
			msg:err
		})
	}
}
