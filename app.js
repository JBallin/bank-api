const express = require('express');
const logger = require('morgan');

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
if (!process.env.NODE_ENV !== 'test') app.use(logger('dev'));

const port = process.env.PORT || 3000;

const indexRouter = require('./src/routes/index');
const accountsRouter = require('./src/routes/accounts');

app.use('/', indexRouter);
app.use('/accounts', accountsRouter);

app.all('*', (req, res) => res.sendStatus(404));

app.use((err, req, res) => {
  res.status(err.status).json(err);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`The bank is open on ${port}!`); // eslint-disable-line no-console
  });
}

module.exports = app;
