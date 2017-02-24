import mongoose from 'mongoose';
import config from './config';
mongoose.Promise = global.Promise;
export default callback => {
  let db = mongoose.connect(config.mongoUrl);
  callback(db);
}
