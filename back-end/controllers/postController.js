var PostModel = require('../models/post');
//B1
exports.createPost = (req, res)=>{
    const {title, content , imageUrl} = req.body;
    if(!title || !content || !imageUrl){
        res.status(422).json({error: "Please add all the fields"});
    }
    console.log(req.user);
    req.user.password = undefined
    //req.user.createAt = undefined
    PostModel.create({
        title: title,
        content: content,
        imageUrl: imageUrl,
        postedBy: req.user,
        
    })
    .then( resultPost =>{
        res.json({message:resultPost})
    })
    .catch(error =>{
        console.log(error);
        
    })
  
    
}
//b2
exports.allpost=(req,res)=>{
    PostModel.find()
    .populate("postedBy","id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({message:posts})
    })
    .catch(error =>{
        console.log(error);    
    })
}
exports.getsubpost=(req,res)=>{
    //if postedBy in following
    PostModel.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({message:posts})
    })
    .catch(error =>{
        console.log(error);    
    })
}
exports.mypost=(req,res)=>{
    PostModel.find({postedBy : req.user._id})
    .populate('postedBy', '_id name')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(error =>{
        console.log(error);    
    })
}
//b3
exports.like=(req,res)=>{
    PostModel.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            return res.json(result)
        }
    })
}

exports.unlike=(req,res)=>{
    PostModel.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}//token
    },{
        new:true
    })  
    .populate("comments.postedBy","_id name")
    .populate("postedBy","id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            return res.json(result)
        }
    })
}
//b4
exports.comment=(req,res)=>{
    const comment ={
        text: req.body.text,
        postedBy: req.user//lay tu token
    }
        PostModel.findByIdAndUpdate(req.body.postId,{
            $push:{comments:comment},
        },{
            new: true
        })
        .populate("comments.postedBy","_id name")
        .populate("postedBy","_id name")
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                return res.json(result)
            }
        })
}
//b5: delete post
exports.delete=(req,res)=>{
    PostModel.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() == req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json( result)
            })
            .catch(err=>{
                console.log(err);
                
            })
        }
    })
}
