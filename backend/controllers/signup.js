const passport=require('passport');
const mongoose=require("mongoose");
const User=mongoose.model("User");
const signup=(req,res)=>{
	if(!req.body.name||!req.body.email||!req.body.password){
		return res.status(400).json({"message":"All fields required"});
	}
	const user=new User();
	user.name=req.body.name;
	user.email=req.body.email;
	user.setPassword(req.body.password);
	user.save((err)=>{
		if(err){
			console.log(err);
			res.status(404).json(err);
		}
		else{
			const token=user.generateJwt();
			res.status(200).json({token});
		}
	})
}
module.exports=signup;