var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    adminID:{
        type:Schema.Types.ObjectId,
        ref:'admin'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    },
    status:{
        type:String,
        enum:['ACTIVE','INACTIVE'],
        default:'ACTIVE'
    }
})

module.exports = mongoose.model('category',categorySchema);