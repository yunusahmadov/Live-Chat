const db = require("../db");
const MainModel =require("./MainModel")
const jwt=require('jsonwebtoken');

class ActiveUsers extends MainModel{
    constructor(){
        super();
        this.table="active_users",
        this.columns=[
            "my_id",
            "other_id",
        ]
    }

    async getUsers  (req){
        const token =req.headers.authorization.split(" ")[1];
        const user = jwt.decode(token);
       
       return new Promise((res, rej)=>{
           
        db.query(`SELECT u.name, u.id from active_users as a 
        JOIN users as u ON a.my_id = ${user.userId} AND a.other_id = u.id`, (err, result)=>{
            if(err){
                rej('Error')
            }else{
                res(result)
            }
        })
        
    })
    }
}

module.exports =new ActiveUsers;