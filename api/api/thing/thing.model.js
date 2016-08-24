import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './thing.seed';
const Schema = mongoose.Schema;

const ThingSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  info: {
    required: true,
    type: String
  }
});

export default createSeedModel('Thing', ThingSchema, seed);