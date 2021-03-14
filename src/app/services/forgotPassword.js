const jwt = require('jsonwebtoken');
const appConfig = loadConfig('appConfig');


module.exports= class PasswordHash{
    
     generateToken(user){
        const secret = appConfig.jwtSecret +user.password;
        const payload={
            id:user.id,
            email:user.email
        };
       
            const token = jwt.sign(payload, secret, {
                expiresIn:'1d'// expires in 24 hours
              });
            return token;
    }
    verifyToken(user,token){
        console.log(token);
        const secret = appConfig.jwtSecret +user.password;
        return jwt.verify(token,secret,(error,payload)=>{
            if(error){
                return error;
            }
            return payload;
        });   
    }

};