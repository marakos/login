import { FETCH_ALL, CREATE_USER, LOGIN_USER } from '../constants/actionTypes';

const user = (userData = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE_USER:
            return [...userData, action.payload];
        case LOGIN_USER:
            return [...userData, action.payload];
        default:
            return userData;
    }
};
export default user;