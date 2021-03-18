import * as alertConstants from '../constants/alertTypes';

export const initializeAlert = alertName => {
    return { type: alertConstants.INITIALIZE_ALERT, alertName }
};

export const createAlert = (alertName, alertMessage) => {
    return { type: alertConstants.CREATE_ALERT, alertName, alertMessage }
};

export const dismissAlert = alertName => {
    return { type: alertConstants.DISMISS_ALERT, alertName }
};

export const destroyAlert = alertName => {
    return { type: alertConstants.DESTROY_ALERT, alertName }
};

export const dismissAllAlerts = () => {
    return { type: alertConstants.DISMISS_ALL_ALERTS };
};

export const destroyAllAlerts = () => {
    return { type: alertConstants.DESTROY_ALL_ALERTS };
};