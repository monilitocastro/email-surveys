import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function( OriginalComponent ){
    class Composition extends Component{
        render(){
            if(this.props.auth.user){
                return <OriginalComponent {...this.props} />;
            }else{
                return (<div></div>)
            }
        }
        componentWillMount(){
            if(!this.props.auth.user){
                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.auth.user){
                this.props.history.push('/');
            }
        }


    }
    
    function mapStateToProps(state){
        return { auth: state.auth };
    }

    return withRouter(connect(mapStateToProps)(Composition));

}
