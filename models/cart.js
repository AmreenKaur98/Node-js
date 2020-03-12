var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    
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
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    },
    userID:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    productID:{
        type:Schema.Types.ObjectId,
        ref:'product'
    },
    status:{
        type:String,
        enum:['ACTIVE','INACTIVE'],
        default:'ACTIVE'
    }
})

module.exports = mongoose.model('cart',cartSchema);