import React from 'react';
import {connect} from 'react-redux';
import AppBar from './AppBar';
import LeftNav from './LeftNav';
import * as leftNav from './redux';
import {logout, hasRole} from '../../auth/redux';

const flex = {
  flex: 1,
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column'
};

const content = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
};

@connect(state => ({leftNav: state.leftNav, user: state.auth.user}), Object.assign({}, leftNav, {logout}))
export default class Shell extends React.Component {
  render () {
    return (
      <div style={flex}>
        <AppBar toggle={this.props.toggle} />
        <LeftNav
          isOpen={this.props.leftNav.isOpen}
          user={this.props.user}
          toggle={this.props.toggle}
          logout={this.props.logout}
          redirect={this.props.redirect} hasRole={hasRole}
        />
        <div style={content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}