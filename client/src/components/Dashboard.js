import React from 'react';
import Surveys from './Surveys';
import { Link } from 'react-router-dom';

const Dashboard = () =>{
    return(
      <div>
        <h1>Dashboard</h1>
        <Surveys />
        <Link to={'/survey'} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Link>
      </div>
    )
  }
export default Dashboard
