import React from 'react';
import {connect} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Paper} from 'material-ui';
import DevTools from '../DevTools';
import * as app from './redux';
import theme from './theme.js';
import appStyles from './app.less';

const styles = {
  app: {
    flex: 1,
    flexDirection: 'column',
    boxSizing: 'border-box',
    display: 'flex',
    margin: 0,
    width: '100%',
    minHeight: '100%',
    height: '100%'
  },
  paper: {
    flex: 1,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  }
};

@withStyles(appStyles)
@connect(state => state.app, app, null)
export default class AppContainer extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext () {
    return {
      muiTheme: getMuiTheme(theme)
    };
  }

  componentDidMount () {
    if (process.env.NODE_ENV !== 'production' && process.env.WEBPACK_ENV === 'client') {
      this.props.renderDevTools();
    }
  }

  render () {
    return (
      <div style={styles.app}>
        <Paper style={styles.paper}>
          {this.props.children}
        </Paper>
        {this.props.isRenderDevTools && <DevTools />}
      </div>
    );
  }
}
