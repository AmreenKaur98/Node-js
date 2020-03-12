var express = require('express');
var router = express.Router();
var adminCategory = require('../controllers/categoryAdmin');
var tok = require('../auth/adminToken')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/adminCategory',tok.verifyToken,tok.verify,(req,res)=>{
    adminCategory.addCategory(req.body,res);
})

module.exports = router