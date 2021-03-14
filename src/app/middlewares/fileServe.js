const path = require('path');
const fs = require('fs');

module.exports=(uploadFileLocation)=>{
    return (req,res,next)=>{
        const {file} = req.params;
        const createError = req.app.get('createError');
        const fileLocation = path.join(uploadFileLocation,file);
        try {
                if (fs.existsSync(fileLocation)) {
                   return res.sendFile(fileLocation); 

                }
               return next(createError(404));
        } catch(err) {
                return next(createError(400));
        }
    
    };
};