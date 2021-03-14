/*
 @ title: Base Model of the project
 @ Purpose: Common method which needs in all method develop here
 @ Use: Every Model should child of this Model
*/
const db = require('./../connections/db');

class BaseModel {

    constructor(){
        this.db = db.getConnection();
        this.table='';
        this.primaryKey = 'id';
        this.select = '*';
    }

    async save(data){
        try{
           const result = this.db(this.table).insert(data);
           return result; 
        }
        catch(insertionError){
            return Promise.reject(insertionError);
        }
    }

    async update(primaryKeyValue,data){
        try{
 
            const result = this.db(this.table).where({[this.primaryKey]: primaryKeyValue })
            .update(data);
            return result;
        }
        catch(updateError){
            return Promise.reject(updateError);
        }
    }

    async delete(primaryKeyValue){
        try{
            const result = this.db(this.table).where({[this.primaryKey]: primaryKeyValue })
            .del();
            return result;
        }
        catch(deleteError){
            return Promise.reject(deleteError);
        }
    }

    async findByField(field,value){

        try{
            const result = await this.db(this.table).select(this.select).where({[field]:value});
            return result;
       }
       catch(error){
           return Promise.reject(error);
       }
    }
    async find(find){

        try{
            const result = await this.db(this.table).select(this.select).where(find);
            return result;
       }
       catch(error){
           return Promise.reject(error);
       }
    }

}

module.exports = BaseModel;