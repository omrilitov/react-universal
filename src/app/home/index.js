import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from './Home';

export default function () {
  return (
    <Route>
      <IndexRoute component={Home} />
    </Route>
  );
}