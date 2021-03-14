const {validationResult} = require('express-validator');
exports.validate =  async (req, res, next) => {

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        
        const validationErrors = formattedError(errors.array());
        
        const {body,params,query} = req;
        
        req.flash('old',JSON.stringify({...body,...params,...query}));
        req.flash('errors',JSON.stringify(validationErrors));
        return res.redirect('back');
    };

exports.apiValidate =  async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const validationErrors = formattedError(errors.array());
        const {body,params,query} = req;
        const responseData = {
            old:{...body,...params,...query},
            errors:validationErrors
        };

        return res.status(422).json(responseData);
    };

function formattedError(errors){
    let errorObject = {};
     for(let i=0;i<errors.length;i++){
         if(!errorObject[errors[i].param]){
            errorObject[errors[i].param]=errors[i].msg;
         }
     }
     return errorObject;
}