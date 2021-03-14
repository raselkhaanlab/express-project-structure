const sgMail = require('@sendgrid/mail');
const appConfig = loadConfig('appConfig');
const apiKey = appConfig.sendGridApiKey;
      sgMail.setApiKey(apiKey);

module.exports = class Mail {

    async send(msg){
        try{
            return await sgMail.send(msg);
        }
        catch(error){
            throw error;
        }
    }

    async passwordReset(msg){
        const message = {
            to: msg.to, 
            from: msg.from || appConfig.mailFrom,
            subject: msg.subject || ` your ${appConfig.appName} account password reset link`,
            text: msg.text||'please go to the url below within 1 day',
            html: msg.html||` <p> follow the link to reset your password with in one day</p>
            <a href="${msg.link}"> example</a>`,
        }

        try{
            return await this.send(message);
        }
        catch(error){
            throw error;
        }

    }
}