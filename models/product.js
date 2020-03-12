var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:[String],
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
    },
    categoryID:{
        type:Schema.Types.ObjectId,
        ref:'category'
    },
    adminID:{
        type:Schema.Types.ObjectId,
        ref:'admin'
    }
})

module.exports = mongoose.model('product',productSchema);