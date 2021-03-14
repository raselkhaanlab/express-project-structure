module.exports= {
    appName :process.env.APP_NAME||'example app name',
    requestLogIntoFile:process.env.REQUEST_LOG_INTO_FILE ||false,
    sessionSecret:process.env.SESSION_SECRET||'4s6zhdjnst',
    sessionName:process.env.SESSION_NAME||'',
    sessionExpired:process.env.SESSION_EXPIRED|| 7 * 24 * 60 * 60 * 1000, //7 day default
    jwtSecret:process.env.JWT_SECRET||'examplesecret',
    sendGridApiKey:process.env.SENDGRID_API_KEY||'',
    mailFrom:process.env.MAIL_FROM||'',
};