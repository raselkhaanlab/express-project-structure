
const BaseModel = loadCore('model');

module.exports = class UserModel extends BaseModel {
    constructor(){
        super();
        this.table = 'users';
    }
    async findByEmail(email){
        try{
             const result = await this.db(this.table).select(this.select).where({email:email});
             return result;
        }
        catch(error){
            return Promise.reject(error);
        }
    }
}