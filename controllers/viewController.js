var user = require('../models/user');
var category = require('../models/category')
var product = require('../models/product')

function viewProduct(body,res){
    // product
    //     .findOne({})
    //     .populate('categoryID')
    //     .exec((err,data)=>{
    //         if(err)
    //             throw err
    //         else
    //         {
    //             //res.send(data);
    //         }
    //     })

    category.aggregate([
        {$lookup:{from:'products',localField:'_id',foreignField:'categoryID',as:'product'}},
        {$project:{name:1,count:{$size:'$product'},product:{$slice:['$product',body.productLimit]} }},
        {$limit:body.CategoryLimit},
        {$skip:body.skip}
        ])
        .exec((err,data)=>{
            if(err)
                throw err;
            else
                res.json({data,categoryCount:data.length});
        })
        
}

function viewCart(body,res){
    console.log('in view cart...')
   user.aggregate([
       {$lookup:{from:'carts',localField:'_id',foreignField:'userID',as:'cart'}},
       {$project:{cartCount:1,name:1,email:1,phoneNo:1,cart:1}}
   ])
   .exec((err,data)=>{
    if(err)
        throw err;
    else
        res.json({data});
})
}

function adminView(body,res){
    console.log('body----',body)
    category.findOne({})
            .limit(body.CategoryLimit)
            .skip(body.CategorySkip)
            .exec((err,data)=>{
                if(err)
                    res.json(err);
                else{ 
                        if(data==null)
                            res.json({Message:'CATEGORY NOT FOUND..'});
                        else{
                            product.findOne({_id:body.productID})
                                .limit(body.productLimit)
                                .skip(body.productSkip)
                                .exec((err,result)=>{
                                    if(err)
                                        res.json(err)
                                    else{
                                        if(result==null)
                                            res.json({Message:'PRODUCT NOT FOUND'})
                                        else{
                                            res.json({data,result})
                                        }
                                    }
                                })
                        }
                }
            })
}
module.exports = {
    viewProduct,
    viewCart,
    adminView
}