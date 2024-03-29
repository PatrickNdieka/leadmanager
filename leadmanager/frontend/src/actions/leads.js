import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from './types.js';

//GET LEADS action
export const getLeads = () => (dispatch, getstate) => {
    axios
        .get('/api/leads/', tokenConfig(getstate))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//DELETE LEADS action
export const deleteLead = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage(
                {deleteLead: 'Lead deleted successfully.'}
            ));
            dispatch({
                type: DELETE_LEAD,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

//ADD LEAD action
export const addLead = (lead) => (dispatch, getState) => {
    axios
        .post('/api/leads/', lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage(
                {addLead: 'Lead added successfully.'}
            ));
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};