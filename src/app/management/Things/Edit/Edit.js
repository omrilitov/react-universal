import React from 'react';
import {
  Dialog,
  FlatButton
} from 'material-ui';

export default class Edit extends React.Component {
  render () {
    const actions = [
      <FlatButton
        key='cancel'
        label='Cancel'
        secondary
        onTouchTap={this.props.dismiss}
      />,
      <FlatButton
        key='save'
        label='Save'
        primary
        keyboardFocused
        onTouchTap={this.props.save}
      />
    ];

    return (
      <Dialog
        title='Edit Thing'
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.dismiss}
      >
        {'Hello, It\'s me'}
      </Dialog>
    );
  }
}