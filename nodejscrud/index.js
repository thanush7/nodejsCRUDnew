const express=require("express");
const expresshbs=require("express-handlebars")
const bodyparser=require("body-parser");

require('dotenv').config();


const app=express();
const port=process.env.PORT || 5000;

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

app.use(express.static("public"));

const handle=expresshbs.create({extname:".hbs"});
app.engine('hbs',handle.engine);
app.set("view engine","hbs");

const routes=require("./server/routes/students");
app.use('/',routes);

app.listen(port,()=>{
    console.log("Listening port");
})
