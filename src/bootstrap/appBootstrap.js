
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const logger = require('morgan');
const helmet = require("helmet");
const compression = require('compression');
const createError = require('http-errors');
const  rfs = require('rotating-file-stream');
const chalk = require('chalk');
const fileUpload = require('express-fileupload');

const morganLogs = chalk.bold.green;


const loader = require('./../loaders/loader');
const db = require("./../connections/db");
const webRouter = require('./../routes/web');
const apiRouter = require('./../routes/api');

const appConfig = loader.loadConfig('appConfig');

const controllerLoader = loader.controller;
const middlewareLoader = loader.middleware;
const loadValidation = loader.loadValidation;

const loadValidate = loader.loadCore('validate');

const validate = loadValidate.validate;
const apiValidate = loadValidate.apiValidate;

module.exports = (express,app)=>{

const bootstraping = {

    appSetup(){
        
        // database connection initialize
        db.intialize();
        //globally availability of loaders

        if(!global.loadModel){
            global.loadModel = loader.loadModel;
        }
        if(!global.loadHelper){
            global.loadHelper = loader.loadHelper;
        }
        if(!global.loadConfig){
            global.loadConfig = loader.loadConfig;
        }
        if(!global.loadService){
            global.loadService = loader.loadService;
        }
        if(!global.loadLibrary){
            global.loadLibrary = loader.loadLibrary;
        }
        if(!global.loadCore){
            global.loadCore = loader.loadCore;
        }
        
        
        const publicPath = path.join(__dirname,'..','..','public'),

              accessLogStream = rfs.createStream('requestLog.log', {
                interval: '1d', // rotate daily
                path: path.join(__dirname,'..','..','storage','logs'),
                compress:"gzip"
                }),

              morganLogFormat='Client-IP=:remote-addr  Remote-user=":remote-user" Request-time=[:date[clf]]  :method  :url  :status Content-length=":res[content-length]"  Response-time=:response-time ms  Referrer=":referrer" User-agent: ":user-agent"'; 

        const sessionOptions = {
            name:appConfig.sessionName,
            secret: appConfig.sessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: appConfig.sessionExpired,
                sameSite:true,
                httpOnly: true
            }
        };

        app.disable('x-powered-by');
        //
        app.locals.title=appConfig.appName;
        
        //attach loaders to app instance
        app.set('createError',createError);
        app.set('loadLibrary',loader.loadLibrary);
        app.set('loadHelper',loader.loadHelper);
        app.set('loadModel',loader.loadModel);
        app.set('loadConfig',loader.loadConfig);
        app.set('loadService',loader.loadService);

        // view engine setup
        app.set('views', path.join(__dirname,'..','app','views'));

        app.set('view engine', 'ejs');
        // app.use(helmet());
        app.use(compression());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(publicPath));
        app.use(cookieParser());
        app.use(session(sessionOptions));
        app.use(flash());
        app.use(fileUpload());
        app.use(logger(morganLogs(morganLogFormat)));
        (appConfig.requestLogIntoFile.toLowerCase()=='true')?app.use(logger(morganLogFormat,{stream:accessLogStream}))
        :false;
    },

    startRouting(){

        const routerProperties= {
            express:express,
            controller:controllerLoader,
            middleware:middlewareLoader,
            getSchema:loadValidation,
            validate:validate,
            apiValidate:apiValidate
        };

        app.use('/api',apiRouter(routerProperties));
        app.use('/', webRouter(routerProperties));
    }
};

return bootstraping;
};