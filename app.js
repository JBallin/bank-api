const express = require('express');
const logger = require('morgan');

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
const { NODE_ENV, PORT } = process.env;
if (NODE_ENV !== 'test') app.use(logger('dev'));

const port = PORT || 3000;

const indexRouter = require('./src/routes/index');
const accountsRouter = require('./src/routes/accounts');

app.use('/', indexRouter);
app.use('/accounts', accountsRouter);

app.all('*', (req, res) => res.sendStatus(404));

app.use((err, req, res) => {
  res.status(err.status).json(err);
});

app.listen(port, () => {
  if (NODE_ENV !== 'test') console.log(`The bank is open on ${port}!`); // eslint-disable-line no-console
});

module.exports = app;
