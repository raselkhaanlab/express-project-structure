const path = require("path");
const appPath = path.join(__dirname,'..','app');


const controller = (controllerPath,...options) => {
    let split = controllerPath.split("/");
    let getPath = controllerPath.replace('/'+split[split.length-1],'');
    let Controller = require(path.join(appPath,'controllers',getPath));
    let controller = new Controller(...options);
    let method  = controller[split[split.length-1]];
    if(!method) throw new Error(`${method} does not exit on the controller`);
    return method.bind(controller);
};

const middleware = (name) => {
    const middlewarePath = path.join(appPath,'middlewares',name);
    const middlewareFunction = require(middlewarePath);
    return middlewareFunction;
};

const loadLibrary = (name,...options)=>{
    const libraryPath = path.join(__dirname,'..','libraries',name);
    const libModule = require(libraryPath);
    const library = new libModule(...options);
    return library;
    
}
const loadHelper = (name)=>{
    const helperPath = path.join(__dirname,'..','helpers',name);;
    const helper = require(helperPath);
    return helper;
    
}
const loadValidation = (name)=>{
    const modulePath = path.join(__dirname,'..','app','validations',name);
    const validation =require(modulePath);
    return validation;
}

const loadModel =(name,...options)=>{
    const modulePath = path.join(__dirname,'..','app','models',name);
    const model =require(modulePath);
    return new model(...options);
};



const loadConfig = (name) => {
    const modulePath = path.join(__dirname,'..','config',name);
    const configuration =require(modulePath);
    return configuration;
};
const loadCore = (name) =>{
    const modulePath = path.join(__dirname,'..','core',name);
    const core =require(modulePath);
    return core;
};
const loadService = (name,...options) =>{
    const modulePath = path.join(__dirname,'..','app','services',name);
    const serviceModule =require(modulePath);
    return new serviceModule(...options);
};

exports.controller = controller;
exports.middleware = middleware;
exports.loadLibrary = loadLibrary;
exports.loadHelper = loadHelper;
exports.loadValidation = loadValidation;
exports.loadModel = loadModel;
exports.loadConfig = loadConfig;
exports.loadCore = loadCore;
exports.loadService = loadService;


