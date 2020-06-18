var mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var userSchema = Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
    followers:[{
        type: ObjectId,
        ref:'User'
    }],
    following:[{
        type: ObjectId,
        ref:'User'
    }]

})
const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;