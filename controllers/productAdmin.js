var category = require('../models/category')
var product = require('../models/product')

function addProduct(body,res){

    category.findOne({_id:body.categoryID},(err,result)=>{
        if(err)
            throw err
        else{
            if(result==null)
                res.json({Message:'THE CATEGORY DOES NOT EXISTS....'});
            else{
                //result = result.toObject();
                // console.log('res--',result);
                // console.log('body----',body.image.length);
                var imgPath=[]
                for(let i=0;i<body.image.length;i++){
                    imgPath[i]=body.image[i].path;
                }
                body.image=imgPath;
                var obj=new product(body);
                    obj.save(function (err, data) {
                        if (err) 
                            res.json(err);
                        else
                            res.json({Message:'NEW PRODUCT ADDED....'});
                });
            }
        }
    })
}

module.exports = {
    addProduct
} 