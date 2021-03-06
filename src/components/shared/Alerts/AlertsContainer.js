import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as alertActions from '../../../actions/alerts';

const defaultState = {
    isVisible: true,
    message: ''
};

const createAlert = config => WrappedComponent => {
    const { alertName } = config;

    class AlertContainer extends Component {
        componentDidMount() {
            this.props.actions.initializeAlert(alertName);
        }

        componentWillUnmount() {
            this.props.actions.destroyAlert(alertName);
        }

        close() {
            this.props.actions.dismissAlert(alertName);
        }
        render() {
            if(!this.props.isVisible) return false;
            return (
                <WrappedComponent message={this.props.message} close={() => this.close()} />
            );
        }
    }

    function mapStateToProps(state) {
        const alerts = state.alerts;
        if (!alerts[alertName]) return defaultState;
        return {
            isVisible: alerts[alertName].isVisible,
            message: alerts[alertName].message
        };
    };

    function mapDispatchToProps (dispatch) {
        return { actions: bindActionCreators(alertActions, dispatch) };
    };
    return connect(mapStateToProps, mapDispatchToProps)(AlertContainer);

};

export default createAlert;