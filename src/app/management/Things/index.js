import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as things from './redux';
import Things from './Things';
import Edit from './Edit';
import {Card} from 'material-ui';

const card = {
  backgroundColor: 'white'
};

@asyncConnect([{
  promise: ({store: {dispatch}}) => dispatch(things.load())
}])
@connect(state => state.management.things, things)
export default class ThingsContainer extends React.Component {
  render () {
    return (
      <Card style={card}>
        {this.props.error && <div>{this.props.error.message}</div>}
        {this.props.loading && <div>{'Loading'}</div>}
        {this.props.loaded && <div>
          <Things things={this.props.things} editThing={this.props.editThing} />
          <Edit />
        </div>}
      </Card>
    );
  }
}
