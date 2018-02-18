[![https://nodei.co/npm/kmmysql.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/kmmysql.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/kmmysql)

# kmSqlClient

a small mysql library built on top of the node [mysql](https://github.com/mysqljs/mysql) client that helps build maintanable helpers

## Installation

npm install kmmysql

## Usage

```javascript

//define your model

module.exports = function test(){
  this.id =  0;
  this.message = "hello from test";
  this.client_name = "jasmine test";
}

```

```javascript
var kmsql = require("kmmysql");
var testModel = require('../models/test.js');

var model = new kmsql(testModel);

//simple query from a table named test
//select id, message, client_name from test;
model.find()
.then(results => {
  //do something here  
});

//where clause
//select id, message, client_name from test where message='command to test insert';
model.find({
  "message": {
    "=": "command to test insert"
  }
})
.then(results => {
  //do somthing here
});

//more where clause
//select id, message, client_name from test where message='command to test insert' and client_name='jasmine-unit-test';
model.find({
  "message": {
    "=": "command to test insert"
  },
  "client_name": {
    "=": "jasmine-unit-test"
  }
})
.then(results => {
  //do something here
});

//insert a record
model.id = 1;
model.message = 'a new record';
model.client_name = 'test client';

//insert into test (id, message, client_name) values (1, 'a new record', 'test client')
 model.create()
 .then(results =>{
   //do something here
 });

//update a record where id=2
//update test set id=2, set message='a new record', set client_name='test client' where id=2
 model.update({
  "id": {
    "=": 2
  }
})
.then(results => {
  //do something here
});

//delete a record where client_name='jasmine test'
model.del({
  "client_name": {
    "=": "jasmine test"
  }
})
.then(results => {
  //do something here
});

//call a store procedure with name 'test'
//CALL TEST(1, 'a new record', 'test client')
model.callp()
.then(results => {
  //do something here
});

//close the pool for all models
model.shutdown((err) => {
  if (err)
    //not good
});

```
By default the library uses a connection pool. If you would like to manage your own connections use the startNewConnection or startNewConnectionPool functions.

```javascript

var connection = model.startNewConnection('my_own_connection');

//do something prepareClause

connection.shutdown((err) => {
  if (err)
  //not good
});

```
