var express = require('express');
var router = express.Router();
var adminproController = require('../controllers/productAdmin')
var multer = require('multer');
var tok = require('../auth/adminToken')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
var upload = multer({storage:storage});
router.post('/adminproduct',tok.verifyToken,tok.verify,upload.array('image',5),(req,res)=>{
    const file = req.files
                if (!file) {
                    const error = new Error('Please upload a file')
                    error.httpStatusCode = 400
                    res.send('errrr')
                }
                //console.log(req.body);
                //console.log('file---',file)
                var obj = {name:req.body.name,
                        price:req.body.price,
                        quantity:req.body.quantity,
                        categoryID:req.body.categoryID,
                        adminID:req.body.adminID,
                        image:file
                        }
                //console.log('obj---',obj);
                adminproController.addProduct(obj,res);
})


module.exports = router