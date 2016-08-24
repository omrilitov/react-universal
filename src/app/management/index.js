import React from 'react';
import {Route} from 'react-router';
import Users from './Users';
import Things from './Things';

export default function () {
  return (
    <Route path='management'>
      <Route path='users' component={Users} />
      <Route path='things' component={Things} />
    </Route>
  );
}