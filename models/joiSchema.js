var Joi = require('joi');

function validation(req,res,next){

const Schema = Joi.object().keys({
    name : Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(4).required(),
    phoneNo: Joi.number().required(),
    author:Joi.string(),
    status: Joi.string(),
    createdAt: Joi.date(),
    updatedAt:Joi.date()
});

Joi.validate(req.body,Schema,(err,data)=>{
    if(err)
        throw err;
    console.log("joi==",data);
    next();
})

}
module.exports ={
    validation
}