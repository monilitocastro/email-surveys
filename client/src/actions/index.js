import { FETCH_USER } from './types';
import axios from 'axios';

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

export function testSendGrid(){
    return async dispatch => {
        const response = await axios.post('/api/surveynew',
            {
                "title":"Give us your feedback",
                "subject":"Give us your feedback",
                "body": "Tell us how we did.",
                "recipients": "nodemailertest4@gmail.com"
            }
        )
        console.log('responsedata', response.data);
    }
}