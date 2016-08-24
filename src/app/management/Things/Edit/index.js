import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as things from '../redux';
import Edit from './Edit';

@asyncConnect([{
  promise: ({store: {dispatch}}) => dispatch(things.load())
}])
@connect(state => state.management.things.edit, things)
export default class EditThingsContainer extends React.Component {
  render () {
    return (
      <Edit
        isOpen={this.props.isOpen}
        dismiss={this.props.dismissEdit}
        save={() => this.props.saveEdit(this.props.thing)}
      />
    );
  }
}
