import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css';

import Header from './Header';
import LandingPage from './LandingPage';
import LandingPageWolf from './LandingPageWolf';
import LandingPageJumbotron from './LandingPageJumbotron';
import Dashboard from './Dashboard';
import SurveyNew from './SurveyNew';
import SurveySays from './SurveySays';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            
            <div>   
                
                <div style={{backgroundColor:'#ee6e73',color:'#fff'}}>
                    <Header />
                    <Route exact path='/' component={LandingPageJumbotron} />
                </div>
                <div className='container'>
                    <Route exact path='/' component={LandingPageWolf} />
                    <div style={{paddingTop:'140px'}}>
                        <Route exact path='/' component={LandingPage}/>
                        <Route exact path='/survey' component={SurveyNew}/>
                        <Route exact path='/surveysays' component={SurveySays}/>
                        <Route exact path='/dashboard' component={Dashboard}/>
                    </div>
                </div>
                
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
