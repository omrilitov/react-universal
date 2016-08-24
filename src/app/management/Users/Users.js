import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';

const table = {
  backgroundColor: 'inherit'
};

export default props => (
  <Table style={table}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>{'Email'}</TableHeaderColumn>
        <TableHeaderColumn>{'First Name'}</TableHeaderColumn>
        <TableHeaderColumn>{'Last Name'}</TableHeaderColumn>
        <TableHeaderColumn>{'Gender'}</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.users.map(user => (
        <TableRow key={user._id}>
          <TableRowColumn>{user.email}</TableRowColumn>
          <TableRowColumn>{user.name.first}</TableRowColumn>
          <TableRowColumn>{user.name.last}</TableRowColumn>
          <TableRowColumn>{user.gender}</TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);