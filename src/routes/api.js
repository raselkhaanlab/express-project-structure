
const {check,body, checkSchema} = require('express-validator');

module.exports = ({express,controller,middleware,getSchema,validate,apiValidate})=>{
    
    const router = express.Router();
    
    router.get("/",(req,res)=>{
        res.send("example to api route");
    });
    
    
    
    return router;
 };