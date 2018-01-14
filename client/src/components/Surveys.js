import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

class Surveys extends Component {
    state={surveys:{}}
    componentDidMount(){
        this.props.fetchSurveys();
    }
    componentWillReceiveProps(nextProps){
        this.setState({surveys: nextProps.surveys})
    }
    renderSurveysList(){
        if(!this.state.surveys.surveyList){
            return (<div></div>);
        }
        const surveyList = this.state.surveys.surveyList;
        const result = surveyList.map( (survey)=>{
            const { _id, title, body, yes, no, lastResponded } = survey;
            return (
                    <div className='card' key={_id} style={{margin:'50px 0', padding:'10px'}}>
                        <span className="card-title black-text darken-1">{ title }</span>
                        <div className='card-content'>
                            { body }
                        </div>
                        <div className='card-action' style={{height:'3em'}}>
                            <span className="card-title black-text darken-1 left" style={{margin:'0 10px'}}>Yes: { yes }</span>
                            <span className="card-title black-text darken-1 left" style={{margin:'0 10px'}}>No: { no }</span>
                            <span className="card-title black-text darken-1 right">Last response: { lastResponded? lastResponded : 'None yet' }</span>
                        </div>
                    </div>
            );
        });
        return result;
    }
    renderError(){
        const {surveys: error} = this.state.surveys;
        if(!error){
            return (<div></div>);
        }
        return (
            <p className='red-text darken-3'>Error: {error}</p>
        )
    }
    render(){
        return(
          <div>
              <h4>Surveys</h4>
              { this.renderError.bind(this)()}
              { this.renderSurveysList.bind(this)() }
          </div>
        )
    }
  }




function mapStateToProps(state){
    return { surveys: state.surveys.surveys};
}


export default connect(mapStateToProps, actions)(Surveys);
