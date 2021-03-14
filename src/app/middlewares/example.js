
module.exports=(req,res,next)=>{
    console.log("--------------------------")
    console.log("example middleware");
    console.log("---------------------------")
    next();
};