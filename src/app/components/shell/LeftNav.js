import React from 'react';
import {
  AppBar,
  Drawer,
  MenuItem,
  Divider,
  IconButton
} from 'material-ui';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import UserIcon from 'material-ui/svg-icons/social/person';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1'
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column'
  },
  appBar: {
    height: '128px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    marginBottom: '16px',
    alignItems: 'center'
  },
  userDescription: {
    display: 'flex',
    flexDirection: 'column'
  },
  userImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
    color: 'rgba(0, 0, 0, 0.7)'
  },
  userEmail: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.7)'
  }
};

export default class AppLeftNav extends React.Component {
  constructor (props) {
    super(props);

    this.menuItems = [
      {route: '/', text: 'Home'},
      {route: '/agenda', text: 'Agenda'},
      {route: '/management/users', text: 'Users'},
      {route: '/management/things', text: 'Things'}
    ];
  }

  navigateTo (url) {
    this.props.redirect(url);
    this.props.toggle(false);
  }

  logout () {
    this.props.logout();
    this.props.toggle(false);
  }

  render () {
    return (
      <Drawer
        style={styles.container}
        docked={false}
        open={this.props.isOpen}
        onRequestChange={open => this.props.toggle(open)}
      >
        <AppBar style={styles.appBar} iconElementLeft={<IconButton onClick={() => this.props.toggle()}><ArrowBack /></IconButton>}>
          <div style={styles.user}>
            <div style={styles.userImage}>
              <UserIcon />
            </div>
            <div style={styles.userDescription}>
              <span>{`${this.props.user.name.first} ${this.props.user.name.last}`}</span>
              <span style={styles.userEmail}>{this.props.user.email}</span>
            </div>
          </div>
        </AppBar>
        <div style={styles.content}>
          {this.menuItems.filter(item => !item.role || this.props.hasRole(this.props.user, item.role)).map(item => (
            <MenuItem key={item.route} onTouchTap={() => this.navigateTo(item.route)}>{item.text}</MenuItem>
          ))}
        </div>
        <Divider />
        <div style={styles.bottom}>
          <MenuItem key='Logout' onTouchTap={() => this.logout()}>{'Logout'}</MenuItem>
        </div>
      </Drawer>
    );
  }
}
