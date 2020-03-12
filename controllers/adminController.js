const bcrypt = require('bcryptjs')
var admin = require('../models/admin');
var jwt = require('../auth/adminToken');

function Login(body,res){
    var e = body.email;
    admin.findOne({email:e},(err, result)=>{
        if(err)
            throw err;
        else{
            if(result==null){
                res.json({Message:'EMAIL NOT FOUND'});
           }
         else{
             result = result.toObject();
             bcrypt.compare(body.password , result.password, function(err, data) {
                 if (err) {
                   throw err
                 } else if (!data) {
                   res.json({Message:"Password doesn't match!"});
                 } else {
                     jwt.CreateToken(result,res);
                     console.log("Password matches! YOU ARE LOGED IN ..")
                 } 
               })
         }
        }
    })
}

function Signup(body,res){
    const saltRounds = 10
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        if(err)
            throw err
        else{
            bcrypt.hash(body.password,salt,(err,hash)=>{
                if(err)
                    throw err
                else{
                    body.password=hash;
                    var obj=new admin(body);
                    obj.save(function (err, result) {
                        if (err) 
                            throw err
                        else
                        res.json({Message:"DONE .."});
                    });
                }
            })
        }
    })
}
module.exports = {
    Login,Signup
}