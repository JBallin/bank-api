const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const cors = require('cors');

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const accountsRoutes = require('./src/routes/accounts.js');

app.use('/accounts', accountsRoutes);

app.all('*', (req, res) => res.sendStatus(404));

app.use((err, req, res) => {
  res.status(err.status).json(err);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`The bank is open on ${port}!`); // eslint-disable-line no-console
  });
}
