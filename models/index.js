const mongoose = require('mongoose');

const env = process.env.NODE_ENV ?? 'development';

const { host, port, dbName } = require('./../configs/mongoDBConfigs.json')[env];

mongoose
  .connect(`mongodb://${host}:${port}/${dbName}`)
  .then(() => console.log('Connection OK'))
  .catch(err => console.log('Connection to MongoDB ERROR!!!'));

module.exports.User = require('./user');
