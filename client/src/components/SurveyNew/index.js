import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import Form from './Form';
import Review from './Review';


class SurveyNew extends Component{
    state = { showReview: false, values: {} };
    setShowReview(showReview, values){
        this.setState({showReview})
        if(showReview && values){
            this.setState({values});
        }
    }
    renderPage(){
        switch(this.state.showReview){
            case true:
                return <Review setShowReview={this.setShowReview.bind(this)} values={this.state.values}/>
            case false:
                return <Form setShowReview={this.setShowReview.bind(this)}/>
            default:
                return (<div></div>);
        }
    }
    render(){
        return(
            <div>
                { this.renderPage.bind(this)() }
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);