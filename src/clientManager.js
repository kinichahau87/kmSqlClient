var kmClient = require('./index');
var config = require('config');

var clientManager = function() {
  const __client = new kmClient.kmmysql({
    connectionLimit: 10
  });
  var mThis = __construct();
  var mInitialized = false;

  function __construct() {
    __client.createConnection(config.get('dbConfig.host'), config.get('dbConfig.user'), config.get('dbConfig.password'), config.get('dbConfig.dbName'), function(err) {
      return this;
    });
  } //end of function

  this.client = function() {
    return __client;
  };

  this.done = function() {
    __client.shutdown(function(err) {
      if (err) {
        return 0;
      }
      return 1;
    });
  };
  return this;
};

module.exports = clientManager;