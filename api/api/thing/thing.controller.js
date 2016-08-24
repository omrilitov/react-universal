import Thing from './thing.model';

// Get list of users
export function index () {
  return Thing.find({});
}
