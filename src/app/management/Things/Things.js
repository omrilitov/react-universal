import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  IconButton,
  TableRowColumn
} from 'material-ui';

const table = {
  backgroundColor: 'inherit'
};

export default props => (
  <Table style={table}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>{'Name'}</TableHeaderColumn>
        <TableHeaderColumn>{'Info'}</TableHeaderColumn>
        <TableHeaderColumn>{'asd'}</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.things.map(thing => (
        <TableRow key={thing._id}>
          <TableRowColumn>{thing.name}</TableRowColumn>
          <TableRowColumn>{thing.info}</TableRowColumn>
          <TableRowColumn>
            <IconButton onClick={() => props.editThing(thing)} iconClassName='material-icons'>
              settings_system_daydream
            </IconButton>
          </TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);