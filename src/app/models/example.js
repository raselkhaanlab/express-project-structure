
const BaseModel = loadCore('model');

module.exports = class ExampleModel extends BaseModel {
    constructor(){
        super();
    }
    
    test(){
        console.log("test success of model");
    }
    example(){
        this.db("users").select("*")
       .then((rows) => {
         console.log('s')
    }).catch((err) => { console.log( err); throw err });
    }
}