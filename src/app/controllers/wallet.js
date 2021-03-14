const flash = require("express-flash");

const BaseController = loadCore("controller");
const userModel = loadModel('user'); 
module.exports = class WalletController extends BaseController {
    constructor(){
        super();
    }
    async index(req,res,next){
        return res.render('pages/wallet/index');
    }
}
