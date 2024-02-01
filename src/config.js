const mongoose=require('mongoose')

const connect=mongoose.connect("mongodb://localhost:27017/login-tut")

//check db connected or not 
connect.then(()=>{
    console.log('Balle balle database connected')
})
.catch(()=>{
    console.log("database not connected")
})

//Create a schema for our database

const loginSchema=new mongoose.Schema({

name:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
});

//Create a model

const collection=new mongoose.model("auth",loginSchema);

module.exports=collection;










