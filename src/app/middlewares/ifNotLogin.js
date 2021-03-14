module.exports = (req,res,next)=>{
    const {user} = req.session;
    if(!user){
        req.flash('fail','please login first');
        return  res.redirect('/login');
    }
    return next();
};