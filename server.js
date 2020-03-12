var express = require('express');
var dbconnection = require('./dbconnection');

var userRouter = require('./routers/userRouter')
var admin = require('./routers/adminRoute')
var product = require('./routers/productRouter')
var cart = require('./routers/cartRouter');
var cartegory = require('./routers/categoryRouter'); 
var view = require('./routers/viewRouter');

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var app=express();
app.use('/uploads',express.static('uploads'))
app.use('/api',userRouter,admin,product,cart,cartegory,view)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000,()=>{
    console.log(' The magic is on port--- 8000 ');
}); 