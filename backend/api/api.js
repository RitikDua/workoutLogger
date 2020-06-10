const router=require("express").Router();
const mongoose=require("mongoose");
const Client=require("../models/client/client");
const Stat=require("../models/client/stat");
const TodayStat=require("../models/client/todayStat");

router.post("/new",(req,res)=>{
	let client=new Client({userId:req.body.userId,username:req.body.username});
	Client.findOne({username:req.body.userId},(err,user)=>{
		if(err) {
			return err;
		}
		if(user)  {
			res.json(user);
		}
		else{
			client.save((err,userHere)=>{
				if(err) return err;
				res.json(userHere)
			}).catch((err)=>next(err))
		}

	}).catch((err)=>next(err))	
})


//update exerciseList
router.post("/add/exerciseList",(req,res,next)=>{
	Client.findOneAndUpdate({userId:req.body.userId},{exerciseList:req.body.exerciseList},{useFindAndModify:false},(err,result)=>{
		if(err) return err;
		else res.json(result);
	}).catch((err)=>next(err))
})

//get exerciseList
router.get("/exerciseList",(req,res,next)=>{
	Client.findOne({userId:req.body.userId},(err,user)=>{
		if(err) return new Error("Client Not Found");
		res.json(user.exerciseList);

	}).catch((err)=>next(err))
})

//add stat or create stat for today
router.post("/add/stat",(req,res,next)=>{
	let stat=new Stat({
			date:(new Date()).toString().slice(0,15),
			userId:req.body.userId,
	});
	Client.findOne({userId:req.body.userId},(err,user)=>{
		if(err) return new Error("User not found");
		
		Stat.findOne({date:stat.date},(err,statH)=>{
			if(err) return err;
			console.log(statH);
			if(statH){res.status=409;//status code for conflict
				res.send("stat is already created for today \n use todaystat");
			}

			else{
					stat.save((err,statR)=>{
					if(err) return (err);
					user.stats.push(stat);
					Stat.populate(user,{path:"stats"},(err,userR)=>{
						if(err) return err;
						userR.save((err,result)=>{
							if(err) return err;
							res.json(result)
						})
					}).catch((err)=>next(err))
				})	
			}
		}).catch((err)=>next(err))
		
	}).catch((err)=>next(err))
})

//add one stat for one exercise with todayStat
router.post("/add/stat/todaystat",(req,res,next)=>{
	let todayStat=new TodayStat({
		userId:req.body.userId,
		exerciseName:req.body.exerciseName,
		exercise:req.body.exercise,
		date:(new Date()).toString().slice(0,15)
	});

	Stat.findOne({date:todayStat.date,userId:todayStat.userId},(err,stat)=>{
		if(err) return err;
		TodayStat.findOne({date:todayStat.date,userId:todayStat.userId,exerciseName:todayStat.exerciseName},(err,todayF)=>{
			console.log(todayStat)
			if(err) return err;
			if(todayF){
				if(check(todayF.exercise,todayStat))
				{
					//logic for duplicate entry
				}
				TodayStat.findOneAndUpdate({date:todayStat.date,userId:todayStat.userId,exerciseName:todayStat.exerciseName},{exercise:todayStat.exercise},{useFindAndModify:false},(err,result)=>{
					if(err) return err;
					res.json(result);
				}).catch((err)=> next(err));
			}
			else{
				todayStat.save((err,todayR)=>{
					if(err) return err;
					stat.todayStats.push(todayStat);
					TodayStat.populate(stat,{path:"todayStats"},(err,statR)=>{
						if(err) return err;
						statR.save((err,result)=>{
							if(err) return err;
							res.json(result);
						});//.catch((err)=>next(err))
					});//.catch((err)=>next(err))
				});//.catch((err)=>next(err))
			}
		}).catch((err)=>next(err))

	}).catch((err)=> next(err));

})


//get today data
router.get("/stats/ondate",(req,res,next)=>{
	Stat.findOne({date:(new Date(""+req.body.date)).toString().slice(0,15),userId:req.body.userId},(err,stat)=>{
		if(err) return err;
		TodayStat.populate(stat,{path:"todayStats"},(err,result)=>{
			if(err) return err;
			res.json(result);
		})
	}).catch((err)=> next(err));
});

//get overall data
router.get("/stats/overall",(req,res,next)=>{
	Client.findOne({userId:req.body.userId},(err,user)=>{
		if(err) return err;
		Stat.populate(user,{path:"stats"},(err,stat)=> {
			if(err) return err;
			res.json(stat);
		})
	}).catch((err)=> next(err));
})
module.exports=router;