import React from 'react';

const LandingPage = () => {
  return (
    <div>
        <div className="row">
          <div className="col s12 m4 l4">
            <div className="card white darken-1">
              <div className="card-content black-text">
                <span className="card-title">Google Plus OAuth 2.0 API</span>
                <p>The security structure is strong enough to keep user information safe, and friendly enough allow quick registration.</p>
              </div>
              <div className="card-action">
                <a href="https://developers.google.com/+/web/api/rest/oauth">Google OAuth</a>
              </div>
            </div>
          </div>

          <div className="col s12 m4 l4">
            <div className="card white darken-1">
              <div className="card-content black-text">
                <span className="card-title">SendGrid API</span>
                <p>We use SendGrid API to send out the surveys. They provide a webhook that we use to record the survey responses.</p>
              </div>
              <div className="card-action">
                <a href="https://sendgrid.com/docs/API_Reference/index.html">SendGrid</a>
              </div>
            </div>
          </div>

          <div className="col s12 m4 l4">
            <div className="card white darken-1">
              <div className="card-content black-text">
                <span className="card-title">Stripe API</span>
                <p>Stripe is an easy way to take customer money. For this demo we since we are in the test mode. There are no actual CC info sent.</p>
              </div>
              <div className="card-action">
                <a href="https://stripe.com/docs/api">Stripe API</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LandingPage;