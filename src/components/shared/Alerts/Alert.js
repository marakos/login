import React from 'react';
import { createAlert } from 'react-redux-alerts';

const MyAlert = ({message, close}) => (
    <div className='myAlert'>
        {message}
        <button onClick={close}> Click to Dismiss me </button>
    </div>
);

/**
 * This is a wrapper method that connects your alert to the store based on a *alertName key. This is the unique identifier that will allow you to both show the alert and dismiss the alert.
 */
export default createAlert({
    alertName: 'myAlert'
})(MyAlert);