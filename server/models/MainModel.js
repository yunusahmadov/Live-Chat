const db = require('../db')
class MainModel {
    constructor(table, columns){
        this.table = table;
        this.columns = columns;
    }

    insert(values){
        let columns = [];
        let allValue = [];
        for(const property in values){
            // console.log(property)
            if(this.columns.find(data=> data == property)){
                columns.push(property)
            }else{
                return 'error'
            }
            allValue.push(`'${String(values[property])}'`)
        }
        db.query(`INSERT INTO ${this.table} (${columns.join(',')}) VALUES (${allValue.join(',')})`, (err, result)=>{
            // console.log(result)
            // console.log(err)
        })
      
    }

    get(where = ''){
        return new Promise((res, rej)=>{
           
            db.query(`SELECT * FROM ${this.table} ${where}`, (err, result)=>{
                if(err){
                    rej('Error')
                }else{
                    res(result)
                }
            })
            
        })
    }
    delete(id){
        return new Promise((res, rej)=>{
           
            db.query(`DELETE FROM ${this.table} WHERE id=${id}`, (err, result)=>{
                if(err){
                    // console.log(err)
                    rej('Error')
                }else{
                    res('deleted')
                }
            })
            
        })
    }
    update(id,values){
        let x=[];

        for(const property in values){
            x.push(`${property}='${values[property]}'`)
        }
        // console.log(x.join(','));
        
        db.query(`UPDATE ${this.table} SET ${x.join(',')}WHERE id=${id}`,(err,result)=>{
            if (err) {
                // console.log(err);
            }
        })
    }
    
    getDesc(where = ''){
        return new Promise((res, rej)=>{
           
            db.query(`SELECT * FROM ${this.table} ${where} ORDER BY price DESC`, (err, result)=>{
                if(err){
                    rej('Error')
                }else{
                    res(result)
                }
            })
            
        })
    }

    getAsc(where = ''){
        return new Promise((res, rej)=>{
           
            db.query(`SELECT * FROM ${this.table} ${where} ORDER BY price ASC`, (err, result)=>{
                if(err){
                    rej('Error')
                }else{
                    res(result)
                }
            })
            
        })
    }

    show(id){
        return new Promise((res, rej)=>{
           
            db.query(`SELECT * FROM ${this.table} WHERE id=${id}`, (err, result)=>{
                if(err){
                    rej('Error')
                }else{
                    res(result[0].name)
                }
            })
            
        })
    }
}


module.exports = MainModel