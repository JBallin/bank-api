const express = require('express');
const logger = require('morgan');

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
const { NODE_ENV, PORT } = process.env;
if (NODE_ENV !== 'test') app.use(logger('dev'));
app.disable('x-powered-by');

const port = PORT || 3000;

const indexRouter = require('./src/routes/index');
const accountsRouter = require('./src/routes/accounts');
const transactionsRouter = require('./src/routes/transactions');

app.use('/', indexRouter);
app.use('/accounts', accountsRouter);
app.use('/transactions', transactionsRouter);

app.all('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => { // eslint-disable-line
  if (err.error && NODE_ENV !== 'test') console.error(err.error); // eslint-disable-line no-console
  res.status(err.status).send(err.message || err);
});

app.listen(port, () => {
  if (NODE_ENV !== 'test') console.log(`The bank is open on ${port}!`); // eslint-disable-line no-console
});

module.exports = app;
