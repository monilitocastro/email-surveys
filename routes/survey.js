const Path = require('path-parser')
const Url = require('url');
const requireAuth = require('../services/requireauth');
const requireCredits = require('../services/requirecredits');
const Survey = require('../models/survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const _ = require('lodash');

// TODO front end reports page

module.exports = app =>{
    app.post('/api/surveys/webhook', (req,res)=>{
        const wh = req.body;
        // console.log(wh)
        const value = _.chain(wh)
            .map( (item)=>{
                const { url, email } = item;
                const path = new Path('/api/:surveyId/:answer');
                const { pathname } = Url.parse(url);
                const urlParams = path.test(pathname);
                const {surveyId, answer} = urlParams;
                return {email, surveyId, answer};
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each( (item)=>{
                const { email, surveyId, answer } = item;
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch:{
                                email : email,
                                responded: false
                            }
                        }
                    },
                    {
                        $set: {
                            "recipients.$.responded": true,
                            "lastResponded" : Date.now()
                        },
                        $inc: {
                            [answer]: 1
                        }
                    }
                )
                .exec();
    
            })
            .value();
        // console.log('VALUE', value);


        res.status(200).send('OK');
    })
    app.post('/api/surveys/webhook_OLD', (req,res)=>{
        const wh = req.body;
        // console.log(wh)
        const value = _.chain(wh)
            .compact()
            .uniqBy('email', 'sg_event_id')
            .each( (item)=>{
                const { email, url } = item;
                const path = new Path('/api/:surveyId/:answer');
                const { pathname } = Url.parse(url);
                const urlParams = path.test(pathname);
                const {surveyId, answer} = urlParams;
                console.log('OUTPUT:', {email, surveyId, answer})
                // TODO sql injection protect 'answer'
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch:{
                                "email" : email,
                                "responded": false
                            }
                        }
                    },
                    {
                        $set: {
                            "recipients.$.responded": true,
                            "lastResponded" : Date.now()
                        },
                        $inc: {
                            [answer]: 1
                        }
                    }
                )
    
            })
            .value();
        // console.log('VALUE', value);


        res.status(200).send('OK');
    })
    app.get('/api/:surveys/:reply', (req, res)=>{
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