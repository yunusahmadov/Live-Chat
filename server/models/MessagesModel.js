const MainModel =require("./MainModel")

class MessagesModel extends MainModel{
    constructor(){
        super();
        this.table="messages",
        this.columns=[
            "id",
            "from_id",
            "to_id",
            "message",
            "date",

        ]
    }
}

module.exports =new MessagesModel;