import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as users from './redux';
import Users from './Users';
import {Card} from 'material-ui';

const card = {
  backgroundColor: 'white'
};

@asyncConnect([{
  promise: ({store: {dispatch}}) => dispatch(users.load())
}])
@connect(state => state.management.users, users)
export default class UsersContainer extends React.Component {
  render () {
    return (
      <Card style={card}>
        {this.props.error && <div>{this.props.error.message}</div>}
        {this.props.loading && <div>{'Loading'}</div>}
        {this.props.loaded && <Users users={this.props.users} />}
      </Card>
    );
  }
}
