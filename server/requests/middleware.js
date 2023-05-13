const UserModel = require("../models/UserModel");
const { users } = require("./AllRequest");
const { checkData } = require("./checkColumns");
const user =UserModel;
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")
module.exports = {
    registerRequest: (req, res, next)=>{
        if(checkData(req, users)){
           return res.status(422).send(checkData(req, users))
        }
        user.get(`WHERE email ='${req.query.email}'`)
        .then(resp=>{
            if (resp.length!=0) {
              return  res.status(422).send([{msg:"Email should be unique"}])
            }else{
                bcrypt.hash(req.query.password,10,(err,result)=>{
                    req.query.password=result;
                    user.insert(req.query)
                    res.status(200).send("user created successfully")
                })
            }
        })
        next();
    },

    loginRequest:(req,res,next)=>{
        user.get(`WHERE email ='${req.query.email}'`)
        .then(resp=>{
            if (resp.length==0) {
                res.status(401).send([{msg:"Email is not exists"}])
            }else{
                bcrypt.compare(req.query.password,resp[0].password,(err,result)=>{
                    // console.log(result);

                    if (result) {
                        const token=jwt.sign(
                            {
                                userId:resp[0].id
                            },
                            "YUNUSSECRET",
                            {expiresIn: "7d"}
                        );
                        res.status(200).send({
                            type: "Bearer",
                            token:token
                        })
                        // console.log(token);
                    }else{
                        res.status(401).send([{msg:"Password is Incorrect"}])
                    }
               
                })
            }
        })
        next()
    },

    checkToken: (req,res,next)=>{
        // console.log(req.headers.authorization);
        try {
            const token =req.headers.authorization.split(" ")[1];
            jwt.verify(token,"YUNUSSECRET")
        } catch (err) {
            res.status(401).send("Unauthendicate")
        }
        next();
    }
}