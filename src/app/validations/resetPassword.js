const {body} = require('express-validator');
module.exports = [
    body('password').notEmpty().withMessage("password can not be empty").trim(),
    body('confirm_password').notEmpty().withMessage('confirm password can not be empty')
    .custom(async (confirmPassword, {req}) => { 
        const password = req.body.password 
    
        // If password and confirm password not same 
        // don't allow to sign up and throw error 
        if(password !== confirmPassword){ 
          throw new Error('confirm password must be same as password') 
        } 
        return true;
      }).trim()
    ];