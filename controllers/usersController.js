const createHttpError = require('http-errors');
const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);
    if (!createdUser) {
      return createHttpError(500, 'Server Error');
    }

    res.status(201).send({ data: createdUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  // TODO pagination mw:
  // TODO            page, results => (limit = results);
  // TODO            offset = skip = (page - 1) * result;
  const { limit, offset } = req.query;

  try {
    const foundUsers = await User.find({}, null, {
      limit,
      skip: offset,
    });

    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {};

module.exports.updateUserById = async (req, res, next) => {};

module.exports.deleteUserById = async (req, res, next) => {};
