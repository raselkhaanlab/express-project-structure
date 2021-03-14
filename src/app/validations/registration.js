const {body} = require('express-validator');
const User = loadModel('user');
module.exports=[
    body('name').notEmpty().withMessage("name can not be empty").trim().escape(),
    body('gender').notEmpty().withMessage("gender can not be empty").trim().escape(),
    body('attachment')
    .custom(async (value,{req})=>{
        if(!req.files)
          {
            throw new Error('file upload can not be ignored');
          }
        const {attachment} = req.files;
        const mime = attachment.mimetype;
        const allowMimes = ['image/jpeg','image/png','image/webp'];
        const found = allowMimes.find(element => element == mime);
        if(!found){
          throw new Error(`please upload file type [${allowMimes.toString()}] `)
        }
        return true;
       }
    ),
    body('birthday').notEmpty().withMessage("birthday can not be empty").trim().escape()
    .isDate().withMessage('must be a valid date format').escape(),
    body('marital_status').notEmpty().withMessage("marrital status can not be empty").trim().escape(),
    body('married_date').optional({nullable: true, checkFalsy: true})
    .isDate().withMessage('must be valid date format').trim().escape(),
    body('email').notEmpty().withMessage('email can not be empty').isEmail().withMessage('must be a valid email')
    .custom(value => {
        return User.findByEmail(value).then(user => {
            if (user.length) {
              return Promise.reject('E-mail already in use');
            }
            return true;
          })
    }).trim(),
    body('password').notEmpty().withMessage('password can not be empty').trim(),
    body('confirm_password').notEmpty().withMessage("confirm password can not be empty")
    .custom(async (confirmPassword, {req}) => { 
        const password = req.body.password 
        // If password and confirm password not same 
        // don't allow to sign up and throw error 
        if(password !== confirmPassword){ 
          throw new Error('confirm password must be same as password') 
        } 
        return true;
      }).trim()
    
]