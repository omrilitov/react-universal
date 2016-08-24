import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as auth from '../redux';
import Signup from './Signup';

@reduxForm({form: 'signup', fields: ['name.first', 'name.last', 'email', 'password']})
@connect(state => state.auth, auth)
export default class SignupContainer extends React.Component {
  render () {
    const {
      fields,
      handleSubmit,
      values,
      signup,
      goToLogin
    } = this.props;

    return (
      <Signup
        fields={fields}
        handleSubmit={() => handleSubmit(() => signup(values))}
        goToLogin={goToLogin}
      />
    );
  }
}