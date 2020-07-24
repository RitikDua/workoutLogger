
const mongoose=require("mongoose");
const Client=mongoose.model("Client");

exports.addExercises=(day,exercisesList)=>{
	let client=Client.findById("");
	if(client.exerciseList)
	{
		let flag=true;
		for(let i=0;i<client.exerciseList.length;i++)
		{
			if(client.exerciseList[i].index===day)
			{flag=false;
				client.exerciseList[i].exercises=exercisesList;
			break;}
		}
		if(flag){
			client.exerciseList.push({index:day,exercises:exercisesList});
		}
	}
	else{

			client.exerciseList.push({index:day,exercises:exercisesList});
	}

	client.save((err,res)=>{
		console.log(res);
		res.send("done")
	})
}