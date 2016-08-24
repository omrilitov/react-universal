import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static childContextTypes = {
    insertCss: PropTypes.func
  };

  render () {
    const {component, store, data} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang='en-us'>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <style type='text/css'>{data.css.join('')}</style>
        </head>
        <body>
          <div id='content' dangerouslySetInnerHTML={{__html: content}} />
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet='UTF-8' />
          <script src='http://localhost:9001/dist/bundle.js' />
        </body>
      </html>
    );
  }
}
