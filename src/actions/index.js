import { FETCH_ALL } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getMessage = () => async (dispatch) => {
    try {
        const { data } = await api.welcomeMessage();
            console.log(data)
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
