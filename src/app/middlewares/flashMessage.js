
module.exports = (req,res,next)=>{
    res.locals.flashMessage= req.flash();
    return next();
};