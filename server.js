const express = require("express")
const bcrypt = require("bcrypt")
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const app = express();

const SECRET_KEY = "566#%^^&&%@";

//hashing : generate salt, generated salt will be used to hash the password
app.post("/register", (req,res)=>{
    console.log(req.query);
    // bcrypt.genSalt(saltRounds, (err, salt)=>{
    //     if(err)console.log(err);
    //     else{
    //         bcrypt.hash(req.query.password, salt, (err, hashPswd)=>{
    //             if(err) console.log(err);
    //             else console.log("HASHED PSWD", hashPswd);
    //         })
    //     }
    // })

    bcrypt.hash(req.query.password, saltRounds, (err, hashPswd)=>{
        if(err) console.log(err);
        else console.log("PSWD", hashPswd);
    })
    res.send({
        status: "User has been registered"
    })
})

app.post("/login", (req,res)=>{
    console.log(req.query);
    const token = jwt.sign(req.query, SECRET_KEY);
    res.send({
        token: token
    })
    // console.log(token);
    const decodeUser = jwt.decode(token, SECRET_KEY);
    console.log(decodeUser);
})

 app.listen(5000, ()=>{
     console.log("Application is running");
 })