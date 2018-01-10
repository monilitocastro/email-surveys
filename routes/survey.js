const requireAuth = require('../services/requireauth');
const requireCredits = require('../services/requirecredits');
const Survey = require('../models/survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

module.exports = app =>{
    app.get('/api/surveys/reply', (req, res)=>{
        res.setHeader('content-type', 'text/html')
        res.end('<h1 style="text-align:center; margin-top:20px"> Thank you :) </h1>');
    })
    app.post('/api/surveys', requireAuth, requireCredits, async (req, res)=>{
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject, 
            body,
            recipients: recipients.split(',').map(email => ({email: email.trim() }) ),
            _user: req.user.id,
            dateSent: Date.now()
        })

        const mailer = new Mailer(survey, surveyTemplate(survey) )
        const response = await mailer.send();
        if(response.statusCode >= 200 && response.statusCode < 300){
            try{
                survey.save();
                req.user.credits -= 1;
                const user = await req.user.save();
                res.status(200).send(user);
            }catch(err){
                console.error(err);
                res.status(500).send('Server error');
            }
        }else{
            console.error(response);
            res.status(400).send('Bad Request');
        }

    })

}