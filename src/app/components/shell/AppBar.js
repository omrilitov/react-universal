import React from 'react';
import {AppBar} from 'material-ui';

export default props => (
  <AppBar onLeftIconButtonTouchTap={() => props.toggle()} title='React Universal' />
);
