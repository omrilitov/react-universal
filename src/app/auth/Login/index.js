import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as auth from '../redux';
import Login from './Login';

@reduxForm({form: 'login'})
@connect(state => state.auth, auth)
export default class LoginContainer extends React.Component {
  render () {
    const {
      fields,
      handleSubmit,
      login,
      goToSignup
    } = this.props;

    return (
      <Login
        fields={fields}
        handleSubmit={() => handleSubmit(login)}
        goToSignup={goToSignup}
      />
    );
  }
}