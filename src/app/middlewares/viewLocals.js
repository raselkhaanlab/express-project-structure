module.exports = (req,res,next)=>{
    
    res.locals.Request = req;
    res.siteContents = {};
    
    next();
};