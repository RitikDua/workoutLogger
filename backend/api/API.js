const router=require("express").Router();
const mongoose=require("mongoose");
const Client=require("../models/client/client");
const Stat=require("../models/client/stat");
const TodayStat=require("../models/client/todayStat");

router.post("/new",(req,res,next)=>{
	const client=new Client();
	client.userId="5edcd572fc3e2b2856ac3a93";
	client.username=req.body.username;
		console.log(""+client);
	// res.send("");
	// res.send("he");
	Client.findOne({username:req.body.username},(err,savedUser)=>{
		if(err) {return err;}
		if(savedUser) {res.json({
			username:savedUser.username,
			_id:savedUser._id
			})
	}
		else{
			client.save((err,user)=>{
				if(err) {return next(err);}
				res.json({
					username:user.username,
					_id:user._id
				})
			})
		}

		}
	)
})
//debugging
router.get("/fun",(req,res)=>{
	res.send("e");
})


//add Exercise List
router.post("/profile/exerciseList",(req,res,next)=>{
	const exercisesListReceived=req.body.exercisesList;
	// const client=new Client();
	console.log(exercisesListReceived);
	// res.send("s");
	// client.userId="5edcd572fc3e2b2856ac3a93";
	// client.username=req.body.username;
	Client.findOneAndUpdate({userId:"5edcd572fc3e2b2856ac3a93"},{exerciseList:exercisesListReceived},{useFindAndModify:false},(err,result)=>{
		if(err) next(err);
		else res.send(result);
	})
})

//get exerciseList
router.get("/add/exerciseList",(req,res,next)=>{
	Client.findOne({userId:req.body.userId},(err,user)=>{
		if(err) return next(err);
		return res.send(user.exerciseList);
	})
})


//add stats for exercise without todayStat
router.post("/add/stat",(req,res,next)=>{
	const stat=new Stat();
	stat.weight=1;
	stat.userId=req.body.userId;
	stat.date=(new Date()).toString().slice(0,15);
	Client.findOne({userId:req.body.userId},(err,user)=>{
		if(err) return next(err);
		stat.save((err,statRecord)=>{
			if(err) return next(err);
			user.stats.push(stat);
			Stat.populate(user,{path:'stats'});
			user.save((err,userRecord)=>{
				if(err) return next(err);
				res.json({
					username:user.username,
					userId:user.userId,
					exerciseList:user.exerciseList
				})
			})
		});
	})
	// res.send("s");
});

//add stat for one exercise with todayStat 
router.post("/add/onestat",(req,res,next)=>{
	const todayStat=new TodayStat();
	
	todayStat.userId=req.body.userId;
	todayStat.exerciseName=req.body.exerciseName;
	todayStat.exercise=req.body.exercise;
	console.log(todayStat);
	Stat.findOne({date:(new Date().toString().slice(0,15))},(err,stat)=>{
		if(err) return next(err);
		todayStat.save((err,todayStatRecord)=>{
			if(err) return next(err);
			stat.todayStats.push(todayStat);
			TodayStat.populate(stat,{path:'todayStats'});
			stat.save((err,userRecord)=>{
				if(err) return next(err);
				console.log(stat);
				res.json({
					userId:stat.userId,
					date:stat.date,
					weight:stat.weight,
					height:stat.height		
				})
			})
		});
	})
	
});


module.exports=router;