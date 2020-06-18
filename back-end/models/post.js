const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    content:{
        type: String,
        require: true,
    },
    imageUrl:{
        type: String,
        require: true
    },
    postedBy:{
        type:ObjectId,
        ref:"User",
        require: true
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
    }],
    createdAt:{
        type: Date,
        default: new Date(),
    }
})

const PostModel = mongoose.model('Post',postSchema);

module.exports = PostModel;