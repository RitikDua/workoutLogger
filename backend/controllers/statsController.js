const Exercise=require(`../models/exerciseModel`);
const mongoose=require("mongoose");
exports.getLastWeekData=async (req,res,next)=>{
	try{
		const toDate=new Date();
		const fromDate=new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
		
		const count=await Exercise.aggregate([

		{$match:{
			
				updatedAt : {
				    '$gte': fromDate,
				    '$lte': toDate
				}

			,user:mongoose.Types.ObjectId(req.user._id)
		}},

	        {$group : { 
	                _id :  { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } } ,  
	              total : {$sum : 1} 
	        }},
	        {
	        	$sort:{
	        		_id:1
	        	}
	        }

		])
		
		res.status(200).json({
			data:count
		})
	}
	catch(err){
		res.status(500).json({ status:'error',
            message:err.message,
            err:err
        })
	}	
}
exports.getLastMonthData=async (req,res,next)=>{
	try{
		const toDate=new Date();
		const fromDate=new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
		
		const count=await Exercise.aggregate([

		{$match:{
			
				updatedAt : {
				    '$gte': fromDate,
				    '$lte': toDate
				}

			,user:mongoose.Types.ObjectId(req.user._id)
		}},

	        {$group : { 
	                _id :  { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } } ,  
	              total : {$sum : 1} 
	        }},
	        {
	        	$sort:{
	        		_id:1
	        	}
	        }

		])
		
		res.status(200).json({
			data:count
		})
	}
	catch(err){
		res.status(500).json({ status:'error',
            message:err.message,
            err:err
        })
	}	
}

exports.getMonthData=async (req,res,next)=>{
	try{

		const count=await Exercise.aggregate([

			{$project : { 
              month : {$month : "$updatedAt"},
              // attemptResult:1
          }}, 
	        {$group : { 
	                _id : {month : "$month" },  
	              total : {$sum : 1} 
	        }}
		])
		res.status(200).json({
			data:count
		})
	}
	catch(err){
		res.status(500).json({ status:'error',
            message:err.message,
            err:err
        })
	}	
}
