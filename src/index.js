var __mysql = require('mysql');
var __Promise = require('promise');

var kmmysql = function(aOptions) {
  "use strict";

  var mConnection = null;
  var mIsConnected = false;
  var mPool = null;
  var mConnectionLimit = 10;

  if (aOptions) {
    if (aOptions.connectionLimit) {
      mConnectionLimit = aOptions.connectionLimit;
    }
  }

  this.createConnection = function(aHost, aUser, aPassword, aDatabase, aCallback) {
    try {
      mPool = __mysql.createPool({
        connectionLimit: mConnectionLimit,
        host: aHost,
        user: aUser,
        password: aPassword,
        database: aDatabase
      });
      mIsConnected = true;
      return aCallback(null);
    } catch (reason) {
      mIsConnected = false;
      return aCallback(reason);
    }
  }; //end of function


  this.query = function(aQuery, values, aCallback) {
    mPool.getConnection(function(err, connection) {
      if (err) {
        return aCallback(err, null);
      }
      connection.query(aQuery, values, function(error, results, fields) {
        connection.release();
        if (error) {
          return aCallback(error, []);
        }
        return aCallback(error, proccessResults(results));
      });
    });
  }; //end of function


  function proccessResults(results) {
    var mResults = [];
    if (results.OkPacket) {
      mResults.push(results);
      return mResults;
    }
    for (var key in results) {
      var data = {};
      for (var rawKey in results[key]) {
        data[rawKey] = results[key][rawKey];
      } //end of for
      mResults.push(data);
    } //end of for

    return mResults;
  } //end of function


  this.shutdown = function(aCallback) {
    mPool.end(function(err) {
      return aCallback(err);
    });
  }; //end of function

  this.IsConnected = function() {
    return mIsConnected;
  };

  return this;
}; //end of module

module.exports.kmmysql = kmmysql;