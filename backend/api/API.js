const router=require("express").Router();
const mongoose=require("mongoose");
const Client=require("../models/client/client");
const Stat=require("../models/client/stat");

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
	Client.findOne({userId:"5edcd572fc3e2b2856ac3a93"},(err,user)=>{
		if(err) return next(err);
		return res.send(user.exerciseList);
	})
})



module.exports=router;