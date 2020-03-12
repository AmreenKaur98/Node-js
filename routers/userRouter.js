var express = require('express');
var router = express.Router();
var joi = require('../models/joiSchema');
var controll=require('../controllers/userController');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/signup',joi.validation,(req,res)=>{
    console.log('in signup router...')
    controll.Signup(req.body,res);
})
router.post('/login',(req,res)=>{
    controll.Login(req.body,res);
})

module.exports = router