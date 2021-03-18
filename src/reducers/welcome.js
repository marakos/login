import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

const message = (message = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case LIKE:
            return message.map((message) => (message._id === action.payload._id ? action.payload : message));
        case CREATE:
            return [...message, action.payload];
        case UPDATE:
            return message.map((message) => (message._id === action.payload._id ? action.payload : message));
        case DELETE:
            return message.filter((message) => message._id !== action.payload);
        default:
            return message;
    }
};
export default message;