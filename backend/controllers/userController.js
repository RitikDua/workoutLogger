const User=require(`../models/userModel`);


exports.getUserById=async (request,response)=>{
    try{
        const userId=request.params.userId;
        const user=await Users.findById(userId);
        response.status(200).json({
            status:'success',
            data:{user}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            err:err.Users
        });
    }
};
exports.changePassword=async (request,response)=>{
    try{
        const {currentPassword,newPassword} =request.body;
        const user=await Users.findById(request.user._id).select('+password');
        if(!user)
            throw new Error('User does\'nt exist');
        if(!await user.isPasswordValid(currentPassword,user.password))
            throw new Error('Incorrect Password');
        user.password=newPassword;
        await user.save();
        response.status(200).json({
            status:'success',
            data:{message:'Password changed successfully'}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            err:err.message
        });
    }
};
exports.updateMe=async (request,response)=>{
    try{
        const updateObj=filterObj(request.body);
        const user=await Users.findByIdAndUpdate(request.user._id,updateObj,{new:true,runValidators:true});
        response.status(200).json({status:'success',data:{user}});
    }
    catch (err){
        response.status(500).json({status:'error',err:err.message});
    }
};


exports.deleteMe=async (request,response)=>{
    try{
        await Users.findByIdAndDelete({_id:request.user._id});
        response.status(204).json({
            status:'success',
            message:'User deleted'
        });
    }
    catch(err){response.status(500).json({status:'error',err:err.message});}
};