const express =require("express")
const app =express()
const cors=require("cors")
const route =require("./router")
app.use(cors());
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const jwt=require('jsonwebtoken');
const MessagesModel = require("./models/MessagesModel");
const ActiveUsers = require("./models/ActiveUsers");

const io = new Server(server, {
    cors:{
        methods: ["POST", "GET"],
        origin: "*"
    }
});

function getUserId(token){
    if(token){
        const user = jwt.decode(token);
    return user.userId
    }
    
}

io.on("connection", (socket)=>{
    socket.on("join-user", (data)=>{
        socket.join(`${getUserId(data)}`);
    })
    socket.on("get-messages", (data)=>{
        MessagesModel.get(`WHERE from_id = ${getUserId(data.token)} AND to_id = ${data.user_id} OR 
        from_id = ${data.user_id} AND to_id = ${getUserId(data.token)} ORDER by id DESC`)
        .then(resp=>{
            io.emit("messages", resp)
        })
    })

    socket.on("send-msg", (data)=>{
        const obj={
            from_id: getUserId(data.token),
            to_id: data.to_id,
            message: data.msg
        }
        MessagesModel.insert(obj);
        ActiveUsers.get(`WHERE my_id = ${getUserId(data.token)} AND other_id = ${data.to_id}`)
        .then(resp=>{
            if(resp.length == 0){
                ActiveUsers.insert({my_id: getUserId(data.token), other_id: data.to_id})
                ActiveUsers.insert({other_id: getUserId(data.token), my_id: data.to_id})
            }
        })
        
    })
});

app.use("/api",route)
server.listen(5500,()=>{
    console.log("Server running...");
})