import 'dotenv/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import logger from './components/logger';

mongooseConfig(mongoose);
mongoose.connect(process.env.MONGO_URI);

const app = express();

expressConfig(app);

app.listen(process.env.API_PORT, () => {
  logger.info('Express listening on port %s', process.env.API_PORT);
});

export default app;
