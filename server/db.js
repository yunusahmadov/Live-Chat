const mysql=require("mysql");

const db=mysql.createConnection({
    host:"localhost",
    port:3306,
    database:"yunus_chat",
    user:"root",
    password:""
})

db.connect(()=>{
    console.log('Connected');
})

module.exports =db;