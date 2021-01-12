const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const regularExpression=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const {v4}=require('uuid');

const userSchema = new mongoose.Schema({
  name:{
        type:String,
        trim:true,
        required:[true,"Please provide your name"]
    },
    email:{
        type:String,
        unique:true,
        lower:true,
        required:[true,"Please provide your email"],
        validate:{
            validator:function(val){            
                return regularExpression.test(val);
            }
        }
    },
    profilePic:{
        type:String,
        default:'https://image.flaticon.com/icons/svg/145/145867.svg'
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],        
        select:false
    },
  exercisesList:{ type:[{
  	day:String,//Day of the week
  	exercises:[String]
  }],
  default:null
},
  stats:{
    type: [{type: mongoose.Schema.Types.ObjectId, ref:'Stat'}],default:null
  }
	// username:String
});
// console.log("FInd");
module.exports=mongoose.model('Client', clientSchema);