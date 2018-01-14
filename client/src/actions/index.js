import { FETCH_USER, FETCH_SURVEYS } from './types';
import axios from 'axios';
import moment from 'moment';

export function fetchUser(){
    return async (dispatch) => {
        const currentUserResponse = await axios.get('/api/current_user');
        const res = currentUserResponse.data;
        const user = res ? res : false;
        dispatch({ type: FETCH_USER, user:user });
    }
}

export function finalizePayment(token, amount, description, currency){
    return async (dispatch) => {
        const response = await axios.post('/api/finalize-payment',
        {
            description,
            source: token.id,
            currency,
            amount
        })
        const user = response.data;
        dispatch({ type: FETCH_USER, user:user });
    }
}

export function sendSurvey( values ){
    const { title, subject, body, recipients} = values;
    return async dispatch => {
        const response = await axios.post('/api/surveys', 
            {
                title,
                subject,
                body,
                recipients
            }
        )
        if(response.status===200){
            const user = response.data;
            dispatch({ type: FETCH_USER, user:user });
        }else if(response.status===500){
            // Server error
            
        }else if(response.status===400){
            // Bad Request
            
        }

    }
}

export function fetchSurveys(){
    return async dispatch => {
        const response = await axios.get('/api/surveys')
        if(response.status===200){
            const list = response.data;
            const surveyList = list.map((item)=>{
                let { lastResponded } = item;
                if(lastResponded){
                    lastResponded = moment(item.lastResponded).format('Do MMMM YYYY');
                }
                return { ...item, lastResponded }
            })
            dispatch({ type: FETCH_SURVEYS, surveys:{surveyList} })
        }else if(response.status===403){
            const { error } = response.data;
            dispatch({ type: FETCH_SURVEYS, surveys:{error}})
        }
    }
}