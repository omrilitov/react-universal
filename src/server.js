import {} from 'dotenv/config';
import {resolve} from 'path';
import express from 'express';
import http from 'http';
import compression from 'compression';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import React from 'react';
import cookie from 'react-cookie';
import ReactDOM from 'react-dom/server';
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect';
import {match, createMemoryHistory} from 'react-router';
import Html from './components/Html';
import Root from './components/Root';
import createStore from './app/create-store';
import createRoutes from './app/routes';

const apiUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;
const app = express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: apiUrl,
  ws: true
});

app.use(compression());
app.use(favicon(resolve('src', 'static', 'favicon.ico')));
app.use(express.static(resolve('static')));

// Proxy to API server
app.all('/:url(api|auth|ws)/*', (req, res) => {
  proxy.web(req, res, {target: apiUrl});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }

  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  res.send({error: 'proxy_error', reason: error.message}).end();
});

app.use((req, res) => {
  cookie.plugToRequest(req, res);

  const data = {css: []};
  const context = {insertCss: styles => data.css.push(styles._getCss())};
  const history = createMemoryHistory(req.originalUrl);
  const store = createStore(history);
  const routes = createRoutes(store);

  match({routes, location: req.originalUrl, history}, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return res.status(404).send('Not Found');
    }

    loadOnServer(Object.assign({}, renderProps, {store}))
      .then(() => {
        const component = (
          <Root store={store} context={context}>
            <ReduxAsyncConnect {...renderProps} />
          </Root>
        );

        global.navigator = {userAgent: req.headers['user-agent']};

        res.send(`<!doctype html>\n
          ${ReactDOM.renderToString(<Html component={component} data={data} store={store} />)}`);
      })
      .catch(err => {
        console.log(err.stack);

        return res.status(500).json(err);
      });
  });
});

server.listen(process.env.PORT, () => {
  console.info('----\n==> ✅  Server is running, talking to API server on %s.', apiUrl);
  console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', process.env.PORT);
});