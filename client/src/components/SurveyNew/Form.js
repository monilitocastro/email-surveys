import React, { Component } from 'react';
import FormInput from '../utils/FormInput';
import validateEmails from '../utils/validateEmails';
import formList from '../utils/formList';

import { Field, reduxForm } from 'redux-form';
import { withRouter } from "react-router-dom";


class Form extends Component{
    handleReviewButton(values){
        this.props.setShowReview(true, values);
    }
    handleCancelButton(){
        this.props.history.push("/dashboard");
    }
    renderList(){
        return formList.map( ({ name, label }, i) => {
                return <Field component={FormInput} type='text' name={name} label={label} key={i}/>
            })
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <div>
                <h2>Create New Survey</h2>
                <form onSubmit={handleSubmit(this.handleReviewButton.bind(this))}>
                    { this.renderList.bind(this)() }
                <div style={{marginTop:'40px'}}>
                    <button className="waves-effect waves-light btn left" onClick={this.handleCancelButton.bind(this)}><i className="material-icons left">cancel</i>Cancel</button>
                    <button type='submit' className="waves-effect waves-light btn right"><i className="material-icons right" >arrow_forward</i>Send</button>
                </div>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    const inputNames = formList.map( item => item.name );
    inputNames.forEach( (name) => {
        if(values[name]===undefined){
            errors[name] = 'Provide a value';
        }
    })

    if(values.recipients){

        const unrecognizeable = validateEmails(values.recipients);
        if(unrecognizeable.length>0){
            errors.recipients = 'The following emails are not valid: ' + unrecognizeable
        }
    }

    return errors;
}

Form = withRouter(reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(Form));

export default Form