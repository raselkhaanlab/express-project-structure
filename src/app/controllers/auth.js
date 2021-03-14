const BaseController = loadCore("controller");
const hashService = loadService('hash');
const fileUploadService = loadService('fileUpload');
const forgotPasswordService = loadService('forgotPassword');
const mailService = loadService('mail');
const userModel = loadModel('user'); 
module.exports = class AuthController extends BaseController {
    constructor(){
        super();
    }
    async login(req,res,next){
        
        return res.render('pages/auth/login');
        
    }
    async postLogin(req,res,next){

        const {email,password} = req.body;

        try{

            let result = await userModel.findByField("email",email);

            if(!result.length){
                
                req.flash('fail','email or password don\'t  match');
                return  res.redirect('back');
            }
            const user = result[0];
            const isMatch =hashService.hashCompare(password,user.password);
            
            if(!isMatch){
                
                req.flash('fail','email or password don\'t  match');
                 return res.redirect('back');
            }

            req.session.user = user;
            
            req.flash('success','successfully login');
            return  res.redirect('/');
            
            
        }
        catch(error){
            const createError = req.app.get("createError");
            return next(createError(error));
        }
    }


    async registration(req,res,next){
        
        return res.render('pages/auth/register');
        
    }
    async postRegistration(req,res,next){
        
        const {
            name,gender,birthday,marital_status,
            married_date,
            email,password
        } = req.body;
        
        const {attachment:uploadFile} = req.files;
        try{
            const {savePath} =await fileUploadService.upload(uploadFile,'attachment');
            const dataTosave = {
                name,
                gender,
                birthday,
                marital_status,
                married_date,
                email,
                password: hashService.hash(password),
                attachment:savePath
            };

            let result = await userModel.save(dataTosave);
            
            result.length?req.flash('success','successfully registration'):
            req.flash('fail','registration fail');

            return  res.redirect('/login');
        }
        catch(error){
            const createError = req.app.get("createError");
            return next(createError(error));
        }
    }

    async forgetPassword(req,res,next){
        return res.render("pages/auth/password_reset_request");
        
    }
    async postForgetPassword(req,res,next){

        let resetLink = 'reset-password';
        const {protocol,hostname} =req;
        const {email} = req.body;

        try{
            const result = await userModel.findByEmail(email);
            const user =result[0];

            const token  = forgotPasswordService.generateToken(user);

            resetLink = `${protocol}://${hostname}:3000/${resetLink}/${user.id}/${token}`;
            const sendMail = await mailService.passwordReset({
                to:user.email,
                link:resetLink
            });
            
            req.flash('success','password reset link is send your email.please check a few moment later')
            res.redirect('/login');
        }
        catch(error){
            const createError = req.app.get("createError");
            return next(createError(error));
        }

        
    }
    async resetPassword(req,res,next){

        const forgotPasswordLink = '/forgot-password';
        const flashFailMsg = 'Invalid password reset link';
        const {id,token} = req.params;
        try{
            const result = await userModel.findByField('id',id);
            if(!result[0]){
                req.flash('fail',flashFailMsg);
                return  res.redirect(forgotPasswordLink);
            }
            const user= result[0];
            const data = forgotPasswordService.verifyToken(user,token);
            
            if(data instanceof Error){
                req.flash('fail',flashFailMsg);
                return  res.redirect(forgotPasswordLink);
            }
           
           return res.render('pages/auth/new_password',{email:user.email});

        }
        catch(error){
            const createError = req.app.get("createError");
            return next(createError(error));
        }
        
    }
    async postResetPassword(req,res,next){

        const flashFailMsg = 'Invalid password reset link';
        const flashSuccessMsg = 'password reset successfull';

        const forgotPasswordLink = '/forgot-password';
        const {id,token} = req.params;
        const {confirm_password} =req.body;
        try{
            const result = await userModel.findByField('id',id);
            if(!result[0]){

                req.flash('fail',flashFailMsg);
                return  res.redirect(forgotPasswordLink);
            }
            const user= result[0];
            const payload = forgotPasswordService.verifyToken(user,token);
            
            if(payload instanceof Error){
                req.flash('fail',flashFailMsg);
                return  res.redirect(forgotPasswordLink);
            }

            const dbResult= await userModel.find({email:payload.email,id:payload.id});
            if(!dbResult.length){
                req.flash('fail',flashFailMsg);
                return  res.redirect(forgotPasswordLink);
            }
           const updateResult =await userModel.update(payload.id,{password:hashService.hash(confirm_password)});
           
           console.log(updateResult);
           req.flash('success',flashSuccessMsg);
           return res.redirect('/login');

        }
        catch(error){
            const createError = req.app.get("createError");
            return next(createError(error));
        }


    }

    async postLogout(req,res,next){
  
        try{
            const logout = await req.session.destroy();

            return  res.redirect('/login');
        }
        catch(error){
            const createError = req.app.get("createError");
            return next(createError(error));
        }
    }
}
