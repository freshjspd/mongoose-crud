const createHttpError = require('http-errors');
const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);
    if (!createdUser) {
      return next(createHttpError(500, 'Server Error'));
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
      sort: { _id: 1 },
    });

    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

// invalid ObjectId in userId => mongoose error
module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }
    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
