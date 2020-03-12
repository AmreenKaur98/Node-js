var cart = require('../models/cart');
var user = require('../models/user');
var product = require('../models/product');


function addCart(body,res){
    console.log('body name----',body.userID);
    user.findOne({_id:body.userID},(err,userdata)=>{
        if(err)
            throw err;
        else{
            if(userdata==null)
            {
                res.json({Message:'USER DO NOT EXISTS...'});
            }
            else{
                product.findOne({_id:body.productID},(err,data)=>{
                    if(err)
                        throw err
                    else{
                        if(data==null){
                            res.json({Message:'PRODUCT NOT FOUND...'})
                        }
                        else{
                            data=data.toObject();
                            if(body.quantity<=data.quantity){
                                data.quantity=(data.quantity)-(body.quantity);
                                console.log('data quty---',data.quantity);
                                product.updateOne({_id:body.productID},{$set:{quantity:data.quantity}},(err,result)=>{
                                    if(err)
                                        throw err
                                    else
                                        console.log('UPDATED');
                                })
                                body.price=data.price;
                                body.name= data.name;
                                var obj=new cart(body);
                                obj.save(function (err, result) {
                                    if (err) 
                                        res.send(err);
                                    else
                                        res.json({Message:'NEW CART ADDED....'});
                                    });
                                userdata.cartCount=userdata.cartCount+1;
                                user.updateOne({_id:body.userID},{$set:{cartCount:userdata.cartCount}},(err,resultdata)=>{
                                        if(err)
                                            throw err;
                                        else{
                                            console.log('çart updated');
                                        }
                                    })
                            }
                            else{
                                res.json({Message:'OUT OF STACK...'});
                            }
                        }
                    }
                })
               
            }
        }
    })
    
    
}

function deleteCart(body,res){

    cart.findOne({userID:body.userID},(err,data)=>{
        if(err)
            throw err
        else
            {
                if(data==null)
                    res.json({Message:'USER NOT having this product....'});
                else{
                    data.cartCount=data.cartCount-1;
                    user.updateOne({_id:body.userID},{$set:{cartCount:data.cartCount}},(err,result)=>{
                        if(err)
                            throw err
                        else
                            console.log('cart count -- ...');
                    })
                    cart.updateOne({_id:body.cartID},{$set:{status:'INACTIVE'}},(err,result)=>{
                        if(err)
                            throw err
                        else
                            res.json({Message:'PRODUCT REMOVED...'});
                    })
                }
            }
    })
    
}
module.exports={
    addCart,deleteCart
}