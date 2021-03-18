import * as api from '../api/index.js';

export const createUser = (userData) => async (dispatch) => {
    try {

        const { data } = await api.createUser(userData);
        if(data ==="Account Created"){
            dispatch({type: "CREATE_USER", payload: data});
        }else{
            return 'email already exists';
        }
    } catch (error) {
        console.log(error.message);
    }
};
export const loginUser = (loginData) => async (dispatch) => {
    try {

        const { data } = await api.loginUser(loginData);

        if(data.message ==="User Exists"){

            dispatch({type: "LOGIN_USER", payload: data});
        }else if(data ==='Email not found' ){
            return 'Email not found';
        }else if(data ==='Incorrect Password' ){
            return 'Incorrect Password';
        }

    } catch (error) {
            console.log(error.message);
        }

};