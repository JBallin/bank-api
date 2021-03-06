# Bank API

## Description
A "Complex API" that supports full CRUD (create, read, update, delete), uses the Model-View-Controller design pattern, features full test coverage, has extensive error handling, and follows "Restful" API conventions.


## Features
* View all accounts/transactions (accounts pull in transactions using SQL Join)
* View specific accounts/transactions
* Create & delete accounts/transactions
* Update specific accounts/transactions

## Tests Screenshot
![tests](bank-api-tests.png?raw=true "tests")

## Usage
```
$ npm i
$ createdb bank_dev
$ npm run seed
$ npm start
$ open http://localhost:3000
```

## Testing
```
$ createdb bank_test
$ npm test
```

## Endpoints
* `/accounts`: GET, POST
* `/accounts/:id`: GET, PUT, DELETE
* `/transactions`: GET, POST
* `/transactions/:id`: GET, PUT, DELETE
