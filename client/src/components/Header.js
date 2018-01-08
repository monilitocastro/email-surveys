import React, { Component } from 'react';
import * as actions from '../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripePayment from './StripePayment';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth: {
                user: false
            }
        }
    }
    componentDidMount(){
        this.props.fetchUser();
    }
    componentWillReceiveProps(nextProps){
        this.setState({auth:{user: nextProps.auth.user}})
    }
    handleTestSendGrid(){
        this.props.testSendGrid();
    }
    renderAuthButtons(){
        switch(this.state.auth.user){
            case null:
                return;
            case false:
                return <li key={'authgoogle'}><a href='/auth/google/' >Sign In</a></li>;
            default:
            // TODO create button for axios post to /api/surveynew to test API
                return [
                    <li key='testsendgrid'>
                        <a href='#' onClick={this.handleTestSendGrid.bind(this)}>Test SendGrid</a>
                    </li>,
                    <li key={'stripepayment'}>
                        <StripePayment>
                        </StripePayment>
                    </li>,
                    <li key={'credits'}><a href='#' style={{cursor:'default'}}>{this.state.auth.user.credits} Credits</a></li>,
                    <li key={'signout'}><a href='/auth/google/signout'>Sign Out</a></li>
                ];

        }
    }
    render(){
        return(
            <div>
                <nav>
                    <div className='nav-wrapper'>
                        <Link to={this.props.auth? '/survey': '/'} className='brand-logo'>SurveyBlast</Link>
                        <ul id='nav-mobile' className='right hide-on-med-and down'>
                            { this.renderAuthButtons.bind(this)() }
                        </ul>
                    </div>
                </nav>
            </div>
          );
    }
}

function mapStateToProps(state){
    return { auth: state.auth};
}


export default connect(mapStateToProps, actions)(Header);