const Schedule=require(`../models/scheduleModel`);
const Exercise=require(`../models/exerciseModel`);
const mongoose=require("mongoose")
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
		const todayGoals=req.body;
		console.log(req.body);
		console.log(req.user);
		let today = new Date();
		let dd = today.getDate();

		let mm = today.getMonth()+1; 
		let yyyy = today.getFullYear();
		if(dd<10) 
		{
		    dd='0'+dd;
		} 

		if(mm<10) 
		{
		    mm='0'+mm;
		} 
		let date=mm+'/'+dd+'/'+yyyy;
		console.log(date);
		await Promise.all(todayGoals.map(async (goal)=>{
			const {name,reqDuration}=goal;
			const exercise=await Exercise.create({name,reqDuration,user:req.user._id});
			list.push({name,reqDuration,exerciseId:exercise._id});
			arr.push(exercise._id);
		}))
		const schedule=await Schedule.findOneAndUpdate({$and:[{user:mongoose.Types.ObjectId(req.user._id)},
			{date:date}]},{exercises:arr},{upsert:true})
		res.status(200).json({
			schedule:schedule,
			todayGoals:list
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
