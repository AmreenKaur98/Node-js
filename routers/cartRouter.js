var express = require('express');
var router = express.Router();
var cartcont = require('../controllers/cartController');
var tok = require('../auth/userToken')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

//FOR SELECTING PRODUCTS IN CART = ROUTES....
router.post('/addCart',tok.verifyToken,tok.verify,(req,res)=>{
    cartcont.addCart(req.body,res);
})

//FOR REMOVING THE PRODUTS ...
router.post('/deleteCart',tok.verifyToken,tok.verify,(req,res)=>{
    cartcont.deleteCart(req.body,res);
})

module.exports = router