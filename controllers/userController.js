const bcrypt = require('bcryptjs')
var user = require('../models/user');
var jwt = require('../auth/userToken');

function Signup(body,res){
    console.log('in controller...');
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
                    var obj=new user(body);
                    obj.save(function (err, result) {
                        if (err) 
                            res.send(err);
                        else
                            res.json({Message:'DONE WITH THE SIGNUP....'});
                    });
                }
            })
        }
    })
}
function Login(body,res){
    var e = body.email;
    user.findOne({email:e},(err, result)=>{
        if(err)
            throw err;
        else
            {
                if(result==null){
                       res.json({Message:'EMAIL NOT FOUND'});
                  }
                else{
                    result = result.toObject();
                    bcrypt.compare(body.password , result.password, function(err, data) {
                        if (err) {
                          throw err
                        } else if (!data) {
                          res.send("Password doesn't match!")
                        } else {
                            jwt.CreateToken(result,res);
                            console.log("Password matches! YOU ARE LOGED IN ..")
                        } 
                      })
                }
            }
    })
}

module.exports={
    Signup,
    Login
}