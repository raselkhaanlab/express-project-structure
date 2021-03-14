const flash = require("express-flash");

const BaseController = loadCore("controller");
const userModel = loadModel('user'); 
module.exports = class HomeController extends BaseController {
    constructor(){
        super();
    }
    async test(req,res,next){
        
         
         req.flash('fail','abc');

         res.redirect('/');
    }
    async index(req,res,next){
        
        return res.render('pages/index');
        
    }
}
