module.exports = {
    checkData: (req, columns)=>{
        let params = [];
        let errors = []
        for(const property in req.query){
            params.push(property)
        };
        columns.forEach(column=>{
            const check = params.find(x=> x == column);
            if(!check){
                errors.push(column)
            }
           
        });

        let errorMsg = [];
        if(errors.length != 0){
           for(const err of errors){
            errorMsg.push({
                msg: `${err} column is required`
            })
           }

           return errorMsg
        }
    }
}