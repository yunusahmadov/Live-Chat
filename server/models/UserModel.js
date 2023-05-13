const MainModel =require("./MainModel")

class UserModel extends MainModel{
    constructor(){
        super();
        this.table="users",
        this.columns=[
            "id",
            "name",
            "email",
            "password",
        ]
    }
}

module.exports =new UserModel;