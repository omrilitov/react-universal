import morgan from 'morgan';
import compression from 'compression';
import {urlencoded, json} from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'api-error-handler';
import mongooseErrors from 'express-mongoose-errors';
import passport from 'passport';
import logger from '../../components/logger';
import routes from './routes';

export default app => {
  app.use(compression());
  app.use(urlencoded({extended: false}));
  app.use(json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(morgan('dev', {
    steam: {
      write: str => logger.debug(str.trim())
    }
  }));

  routes(app);

  app.use(mongooseErrors());
  app.use(errorHandler());
};
