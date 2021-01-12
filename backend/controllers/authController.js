const {promisify}=require('util');
const jwt=require('jsonwebtoken');
const User= require(`../models/userModel`);
exports.sendToken=(id,user,statusCode,request,response)=>{
    const token =jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIREIN});
    const cookieOptions={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRESIN*24*3600*1000),
        httpOnly:true,
        secure:request.secure||request.headers['x-forwarded-proto']==='https'
    };
    if(user)
        user.password=undefined;
    response.cookie('jwt',token,cookieOptions);
    response.status(statusCode).json({
        status:'success',
        data:{
            token,user
        }
    });
};
exports.protect=async (request,response,next)=>{
    let token;
    //Get Token and check if it's there
    if(request.headers.authorization&&request.headers.authorization.startsWith('Bearer'))
        token=request.headers.authorization.split(' ')[1]; 
    else if(request.cookies.jwt)
        token=request.cookies.jwt;   
    if(!token)
        return response.status(401).json({status:'error',message:'You are not logged in!!..Please login to get access.'});
    //Verify the token and check if it is manipulated or not    
    let decoded;
    try{
        decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY);    
    }    
    catch(err){return response.status(500).json({status:'error',err:err.message});}
    //decoded:-this will return the payload of user to whom the token was alloted which contains the user's id.
    //Now,Check if user still exists or not 
    const currentUser=await User.findById(decoded.id);
    if(!currentUser)
        return response.status(401).json({status:'error',message:'The user belonging to this token does no longer exist.'});
    //Now,check if user changed his password after ...allotment of JWT or not...if yes..then deny the accesss     
    // if(currentUser.isPasswordChanged(decoded.iat*1000))
    //     return response.status(401).json({status:'error',message:'User recently changed password! Please log in again.'});
    request.user=currentUser;

    next();
};
exports.login = async (request,response)=>{
    try{
        const {email,password}=request.body;
        if(!email || !password)
            return response.status(400).json({status:'error',message:'Please provide email and password'});
        const user=await User.findOne({email}).select('+password');
        if(!user||!await user.isPasswordValid(password,user.password))
            return response.status(401).json({status:'error',message:'Incorrect email or password'});        
        return exports.sendToken(user._id,user,200,request,response);
    }
    catch(err){response.status(500).json({status:'error',err:err.message});}
};
exports.logout = async (request,response)=>{
    try{
        request.clearCookies('jwt');
        response.status(200).json({
            status:'success',
            message:'Logged out successfully'
        });
    }
    catch (err){response.status(500).json({status:'error',err});}
};
exports.signup = async (request,response)=>{
   console.log("asd");
    try{
        const userDetails={
            name:request.body.name,
            email:request.body.email,
            password:request.body.password
        }
        const user=await User.create(userDetails);        
        return exports.sendToken(user._id,user,201,request,response);
    }
    catch(err){response.status(500).json({status:'error',err:err.message});}
};