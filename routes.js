
const passport = require('passport');
const requireAuth = require('./services/requireauth')
module.exports = (app) => {
    app.get('/', (req, res)=>{
        res.send('Hello world!');
    })

    app.get('/auth/google/signup', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.profile' }) );

    app.get('/auth/google/callback',  passport.authenticate('google', { failureRedirect: '/auth/google/signin' }), (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    })

    app.get('/auth/google/signout', (req, res)=>{
        req.logout();
        res.redirect('/');
    })
    
    app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    })

    app.get('/api/protected_resource', requireAuth, (req, res)=>{
        res.send('Super secret resource.')
    })


}