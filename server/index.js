'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file-upload-routes');
const mongoose = require('mongoose');
const multiplefile = require('./models/multiplefile');

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

require('./database')();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/*mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})*/

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes

app.use('/api', fileRoutes.routes);


app.get('/users', async (req,res,next) => {
    const searchedField= req.query.name;
    await User.find({name:{$regex: searchedField,$options: '$i'}})
    .then(data=>{
        res.send(data);
    })
});
app.post('/searchName', async (req,res,next) => {
    const Name= req.body.ID;
    console.log(Name);
    await multiplefile.find({title:{$regex: Name,$options: '$i'}})
    .then(data=>{
        console.log(data);
        res.send(data);
    })
});
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 
/*app.get('/searchName',function(req,res){
    const Name= req.body.ID;
    multiplefile.find({title:{$regex: Name,$options: '$i'}},function(err,res1){
      if(err){
        console.log("Error in fetching list");
        return;
      }
      return res.render('home',{
        response:res1
      });
      return console.log(res1);
    })
  });*/


app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

   
    
}) 

app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));