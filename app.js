const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const accountsRouter = require('./src/routes/accounts');

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
