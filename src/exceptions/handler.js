const chalk = require('chalk');
const error = chalk.bold.red;
const info = chalk.blue.bold;
module.exports= (app)=>{

  const logError = (err)=>{
    console.log(info("====== Request response lifeCycle error logs =========\n"));
    console.log(err.status?error(err.status):'');
    console.log(error(err.stack||err));
    console.log(info("====== End Request response lifeCycle error logs =========\n"));
  }
  const handler = {
    handle(){
        
        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
          const createError = app.get('createError');
          return next(createError(404));
        });

        // error handler
        app.use(function(err, req, res, next) {

          logError(err);
          // set locals, only providing error in development
          res.locals.message = err.message;
          res.locals.error =app.get('env') === 'development' ? err : {};

          // render the error page
          const errStatus = err.status||500;

          if(app.get('env') === 'development'){

          return res.status(errStatus).render('error');
        }
        else{
          switch(errStatus){

            case 500:
            return res.status(500).render('500');
            break;
            case 404:
            return res.status(404).render('404');
            break;
            default:
            return res.status(errStatus).end();
          }
        }
        

        });
    }
  }
  return handler;
};