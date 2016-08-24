import React from 'react';

import {
  CardTitle,
  CardText,
  CardActions,
  FlatButton
} from 'material-ui';

import {Field} from 'redux-form';
import {TextField} from 'redux-form-material-ui';

const styles = {
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  text: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default class Login extends React.Component {
  render () {
    const {
      handleSubmit,
      goToSignup
    } = this.props;

    return (
      <form onSubmit={handleSubmit()}>
        <CardTitle title='Login' />
        <CardText style={styles.text}>
          <Field id='email' floatingLabelText='Email' name='email' component={TextField} />
          <Field id='password' floatingLabelText='Password' name='password' component={TextField} type='password' />
        </CardText>
        <CardActions style={styles.actions}>
          <FlatButton onClick={goToSignup} label='Not a user?' />
          <FlatButton type='submit' label="Let's go!" secondary />
        </CardActions>
      </form>
    );
  }
}