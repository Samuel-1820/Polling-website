const express=require('express');
const app = express();
const cors=require('cors')
const CreateModel = require ('./Models/Create')
const mongoose =require('mongoose')
app.use(express.json());
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Poll")
.then(()=>console.log("coonected to db"))


app.post("/register",(req,res)=>{
    CreateModel.create(req.body)
    .then(Create => res.json(Create))
    .catch(err =>res.json(err))
})
app.get("/getusers",(req,res)=>{
    CreateModel.find({}).sort('-date')
    .then(Create => res.json(Create))
    .catch(err =>res.json(err))
})
app.get("/getusers",(req, res)=>{
    res.send(`<h1>Working</h1>`);
})
app.listen(4500,()=>{
    console.log("server is running");
})