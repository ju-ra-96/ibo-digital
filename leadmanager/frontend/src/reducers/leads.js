import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from '../actions/types';
import React from 'react';

const initialState = {
    leads: []
};



export default function(state = initialState, action) {
    switch (action.type) {
        case GET_LEADS:
            return{
                ...state,
                leads: action.payload
            };
        case DELETE_LEAD:
            return{
                ...state,
                leads: state.leads.filter(leads => leads.id !== action.payload)
            };
        case ADD_LEAD:
            return{
                ...state,
                leads: [...state.leads, action.payload]
            };
        default:
                return state;
    }
}
