import React, { Component } from 'react';
import formList from '../utils/formList';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from "react-router-dom";

class Review extends Component{
    state={disableButtons:false}
    handleSendButton(){
        this.props.sendSurvey(this.props.values);
        this.setState({disableButtons:true})
        this.props.history.push('/dashboard')
        
    }
    handleCancelButton(){
        this.props.setShowReview(false);
    }
    renderValues(){
        const result = formList.map( ({name, label}, i) => {
            return (
                <div key={i}>
                    <p style={{fontSize:'2em', fontWeight:'300'}}>{label}</p>
                    <p style={{fontSize:'1.5em', fontWeight:'200'}}>
                        {this.props.values[name]}
                    </p>
                </div>
            );
        })
        return result;
    }
    render(){
        return(
            <div>
                <h2>Review Before Sending</h2>
                {this.renderValues.bind(this)()}
                <div>
                    <button className="waves-effect waves-light btn left" onClick={ this.handleCancelButton.bind(this) } disabled={this.state.disableButtons}><i className="material-icons left">arrow_back</i>Back</button>
                    <button className="waves-effect waves-light btn right" onClick={ this.handleSendButton.bind(this) } ref='sendButton' disabled={this.state.disableButtons}><i className="material-icons right" >send</i>Send</button>
                </div>
            </div>
        )
    }
}


export default withRouter(connect(null, actions)(Review))