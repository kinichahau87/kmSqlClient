var kmClient = require('./index');
var config = require('config');

const __client = new kmClient.kmmysql({
  connectionLimit: 10
});

var KModel = function(args) {
  "use strict";

  this.id = -1;
  var mThis = __construct();
  var mViewName = '';

  if (args) {
    for (var arg in args) {
      this[arg] = args[arg];
    }
  } //end of if

  function __construct() {
    __client.createConnection(config.get('dbConfig.host'), config.get('dbConfig.user'), config.get('dbConfig.password'), config.get('dbConfig.dbName'), function(err) {
      if (err) {
        throw err;
      }
      return this;
    });
  } //end of function


  this.find = function(aClause, findCallback) {
    var sql = "";
    var properties = [];
    var values = [];
    for (var key in this) {
      if (this.hasOwnProperty(key) && typeof(this[key]) !== "function") {
        properties.push(key);
      }
    } //end of for

    sql = ("SELECT " + properties.join(",") + " FROM " + mViewName).toUpperCase();
    __client.query(sql, values, function(err, results) {      
      return findCallback(err, results);
    }); //end of query
  }; //end of find

  this.setViewName = function(aViewName) {
    mViewName = aViewName;
  };

  return this;
};

module.exports.KModel = KModel;