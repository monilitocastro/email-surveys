
const passport = require('passport');
const bodyParser = require('body-parser')
const requireAuth = require('../services/requireauth')
const requireCredits = require('../services/requirecredits')
const Mail = require('../services/SendGrid/Mail')
const Mailer = require('../services/SendGrid/Mailer')

const keys = require('../config/keys');

module.exports = (app) => {
    // TODO requireAuth, requireCredits, 
    app.post('/api/surveynew', (req, res)=>{
        const { title, subject, body, recipients } = req.body;
        console.log('BODY', req.body);
        const mail = new Mail( { title, subject, body, recipients } );
        const recipientsModelList = recipients.split(',').map( email => ({email}) )
        const recipientsList = recipientsModelList.map( item => item.email)
        console.log('RECIPIENTSLIST', recipientsList)
        const mailer = new Mailer(mail, recipientsList);
        const response = mailer.send();
        console.log('MAILER RESPONSE: ', response);

        if(response.status>=200 && response.status<300){
            res.status(200).send('OK')
            // put together survey mongodb model and save to db
            
            // respond back with success message

        }else{
            res.status(403).send('Failed')
            // respond back with fail message

        }
        res.status(200).send('OK')
   })
}