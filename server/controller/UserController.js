const UserModel =require("../models/UserModel")
const MessagesModel=require("../models/MessagesModel")
const jwt=require('jsonwebtoken');
const ActiveUsers = require("../models/ActiveUsers");
const userModel=UserModel
const messagesModel=MessagesModel



const getOneUser = async (req) => {
    if(req.query.search != ''){
        return userModel.get(`WHERE name like "%${req.query.search}%"`)

    }else{
    return userModel.get()

    }
}

const getAllUsers=(req)=>{
    const token =req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token)
    return userModel.get(`WHERE id != ${user.userId}`)
}

const InsertMessage  = (req) => {
        messagesModel.insert(req.query)
        return 'Message Sended';
    }

    const getUsers=(req)=>{
        console.log(req.query)
        if(req.query.search != ''){
            return userModel.get(`WHERE name like "%${req.query.search}%"`)

        }else{
        return userModel.get()
    
        }
    }

    
const getActiveUsers= async (req)=>{
    return await ActiveUsers.getUsers(req)
}
const getUserName = async (req) => {
    // return await userModel.show(`WHERE name = ${req.query.name}`);
    return await userModel.show(req.query.id)

}

module.exports ={getAllUsers,InsertMessage,getOneUser,getUsers, getActiveUsers,getUserName}