var express = require('express');
var router = express.Router();
var joi = require('../models/joiSchema');
var admincont = require('../controllers/adminController')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/adminsignup',joi.validation,(req,res)=>{
    admincont.Signup(req.body,res);
})
router.post('/admin',(req,res)=>{
    console.log('in admin-----')
    admincont.Login(req.body,res);
})

module.exports = router