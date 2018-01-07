import React, { Component } from 'react';
import Stripe from 'react-stripe-checkout';
import * as actions from '../actions';
import { connect } from 'react-redux';
  
class StripePayment extends Component{
    onToken(amount, description, currency){
        const self = this;
        return function(token){
            self.props.finalizePayment(token, amount, description, currency);
        }
    }

    render(){
        const description = 'Buy 5 Credits', amount = 500, currency = 'USD';
        return(  
            <Stripe
              name={'SurveyBlast'}
              description={description}
              amount={amount}
              token={this.onToken.bind(this)(amount, description, currency)}
              currency={currency}
              stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
            />
          
            )
    }
}

export default connect(null, actions)(StripePayment)
