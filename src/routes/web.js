
const {check,body, checkSchema} = require('express-validator');
const path = require('path');

const uploadFileLocation = path.join(__dirname,'..','..','storage','uploads');

module.exports = ({express,controller,middleware,getSchema,validate,apiValidate})=>{
    
    const router = express.Router();
    
    router.use(middleware('flashMessage'));
    router.use(middleware('viewLocals'));
    router.get('/files/:file(*)',middleware('fileServe')(uploadFileLocation));

    router.get('/reset-password/:id/:token',middleware('ifLogin'),controller('auth/resetPassword'));
    router.post('/reset-password/:id/:token',middleware('ifLogin'),
    getSchema('resetPassword'),validate,
    controller('auth/postResetPassword'));

    router.get('/forgot-password',middleware('ifLogin'),controller('auth/forgetPassword')),
    router.post('/forgot-password',middleware('ifLogin'),
            getSchema('forgotPassword'),validate,
            controller('auth/postForgetPassword'));

    router.get("/login",middleware('ifLogin'),controller("auth/login"));
    router.post("/login",middleware('ifLogin'),getSchema('login'),validate,controller("auth/postLogin"));

    router.get('/logout',middleware('ifNotLogin'),controller('auth/postLogout'));

    router.get("/registration",middleware('ifLogin'),controller("auth/registration"));
    router.post("/registration",middleware('ifLogin'), getSchema('registration'),validate,controller("auth/postRegistration"));
    router.get("/",controller("home/index"));
    router.get("/wallet",controller("wallet/index"));
    return router;
 };
