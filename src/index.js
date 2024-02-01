const express=require('express');
const path=require('path')
const bcrypt=require('bcrypt');
const collection=require('./config')

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs');

//static file

app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render('login');
})

app.get('/signup',(req,res)=>{
res.render('signup');
})


//Register user in the DB
app.post('/signup',async(req,res)=>{

const data={
    name:req.body.username,
    password:req.body.password
}

//CHECK if user exists

const existingUser=await collection.findOne({name:data.name})
if(existingUser){
    res.send("User already exists")
}
else{
   //hash the password with bcrypt library
   const SaltRounds=10;
   const hashPassword=await bcrypt.hash(data.password,SaltRounds)
    
   data.password=hashPassword; //Replace the original password with hashPassword

    const userData= await collection.insertMany(data);
    console.log(userData);
}

})

//Login code logic
app.post('/login',async(req,res)=>{
  
try{
  
const checkUser=await collection.findOne({name:req.body.username})
if(!checkUser){
    res.send("User cannot be found")
}
//compare hashpassword
const isPasswordMatch=await bcrypt.compare(req.body.password,checkUser.password)
if(isPasswordMatch){
    res.send("Congrats welcome to the home screen")
}
else{
    res.send("Invalid login")
}
}catch{
res.send("Something went wrong")
}

})









app.listen(3000,()=>{
    console.log("Server started succesfully!");
})
