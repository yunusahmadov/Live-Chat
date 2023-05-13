const express = require("express");
const { getAllUsers ,InsertMessage, getOneUser, getActiveUsers,getUserName,getUsers} = require("./controller/UserController");
const { registerRequest,loginRequest, checkToken, } = require("./requests/middleware");

const route = express.Router();

route.post("/register", registerRequest, (req, res)=>{
    // console.log(req.query);
    // res.status(200).send("User register successfuly")
});


route.post("/login", loginRequest, (req, res)=>{
    // res.status(200).send("User register successfuly")
});


route.get('/get-all-users',checkToken,(req,res)=>{
    getAllUsers(req)
    .then(resp=>{
        res.status(200).send(resp)
    })
})

route.get('/get-one-user',checkToken, (req, res)=>{
    getOneUser(req)
    .then(resp=>{
        res.status(200).send(resp)
    })
})


route.post('/messages',(req,res)=>{
    // res.status(200).send("Message sended")
    InsertMessage(req);
    res.status(200).send(`Message added successfuly`)
})


route.get("/users",checkToken,(req,res)=>{
    getUsers(req)
    .then(resp=>{
        res.status(200).send(resp)
    })
})

route.get('/get-active-user',checkToken,  (req, res)=>{
    getActiveUsers(req)
    .then(resp=>{
        res.status(200).send(resp)
    })
})

route.get('/get-user-name',checkToken,  (req, res)=>{
    getUserName(req)
    .then(resp=>{
        res.status(200).send(resp)
    })
})

module.exports = route;