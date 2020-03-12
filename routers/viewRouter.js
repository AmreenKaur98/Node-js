var express = require('express');
var router = express.Router();
var viewcontrol = require('../controllers/viewController')
var tokuser = require('../auth/userToken')
var tokaddmin = require('../auth/adminToken')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

// USER TO VIEW PRODUCT..
router.post('/userView',tokuser.verifyToken,tokuser.verify,(req,res)=>{
    viewcontrol.viewProduct(req.body,res);
})

// USER TO VIEW CART...
router.post('/cartView',tokuser.verifyToken,tokuser.verify,(req,res)=>{
    viewcontrol.viewCart(req.body,res);
})

//ADMIN TO VIEW PRODUCT + CATEGORY.. 
router.post('/adminView',tokaddmin.verifyToken,tokaddmin.verify,(req,res)=>{

    viewcontrol.adminView(req.body,res);
})
module.exports = router