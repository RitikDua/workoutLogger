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
    weight:Number,
    height:Number,

},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) 
        return next(); 
    this.password=await bcrypt.hash(this.password,10);
    if(this.isNew){
        this.coursesProgress={};        
        return next();
    }        
});
userSchema.methods.isPasswordValid=async function(inputPassword,dbHash){return await bcrypt.compare(inputPassword,dbHash);}

userSchema.methods.createPasswordResetToken=async function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpire=Date.now()+(10*60*1000);
    return resetToken;
}
module.exports=mongoose.model('User',userSchema);
