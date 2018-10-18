const model = require('../models/accounts');

const getAllAccounts = (req, res, next) => {
  const promise = model.getAllAccounts();

  promise.then(result => (result.error ? next(result) : res.status(200).json(result)));

  promise.catch((err) => {
    next(err);
  });
};

const getAccountById = (req, res, next) => {
  const { id } = req.params;
  model.getAccountById(id)
    .then(result => (result.error ? next(result) : res.status(200).json(result)))
    .catch((err) => {
      next(err);
    });
};

};

module.exports = { getAllAccounts, getAccountById };
