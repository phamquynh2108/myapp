var PostModel = require('../models/post');
var userModel = require('../models/user')

exports.allusers = (req,res)=>{
    userModel.find(_id)
    .select("-password")
    .then(users=>{
        res.json({message:users})
    })
    .catch(error =>{
        console.log(error);    
    })
}

exports.user = (req,res) =>{
    userModel.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        PostModel.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    })
    .catch(err=>{
        return res.status(404).json({
            error:"User not found"
        })
    })
}

exports.follow = (req,res) =>{
    userModel.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new: true
    },(err,result)=>{
        if(err){
            return res.status(404).json({error: err})
        }
        userModel.findByIdAndUpdate(req.user._id,{
            $push:{following: req.body.followId}
        },{
            new:true
        })
        .select("-password")
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            return res.status(422).json({
                error:err
            })
        })
    
    })
}

exports.unfollow = (req,res) =>{
    userModel.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{
        new: true
    },(err,result)=>{
        if(err){
            return res.status(404).json({error: err})
        }
        userModel.findByIdAndUpdate(req.user._id,{
            $pull:{following: req.body.followId}
        },{
            new:true
        })
        .select("-password")
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            return res.status(422).json({
                error:err
            })
        })
    
    })
}


