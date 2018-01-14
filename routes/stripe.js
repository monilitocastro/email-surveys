
const passport = require('passport');
const requireAuth = require('../services/requireauth')
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
    // TODO requireAuth
    app.post('/api/finalize-payment', requireAuth, (req, res, next)=>{
        const source = req.body.source;
        const currency = req.body.currency;
        const amount = req.body.amount;
        const description = req.body.description;
        stripe.charges.create({
            amount,
            currency,
            source,
            description
        }, async function(err, charge){
            if(err){
                next(err);
            }
            if(charge && charge.id){
                const creditsToAdd = amount / 100;
                req.user.credits += creditsToAdd;

                const user = await req.user.save();
                res.send(user)
            }
        })
    })
}