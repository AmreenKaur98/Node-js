var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true,
        unique:true
    },
    author:{
        type:String,
        default:'USER'
    },
    cartCount:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:['ACTIVE','BLOCKED','DELETED'],
        default:'ACTIVE'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
});

module.exports = mongoose.model('user',userSchema);