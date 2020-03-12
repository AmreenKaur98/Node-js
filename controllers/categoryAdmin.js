var category = require('../models/category');
 
function addCategory(body,res){
    var obj=new category(body);
    obj.save(function (err, data) {
        if (err) 
            res.json(err);
        else
            res.json({Message:'NEW CATEGORY ADDED....'});
        });
}

module.exports={
    addCategory
}