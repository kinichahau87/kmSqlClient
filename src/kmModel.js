var kmClient = require('./index');

const __client = new kmClient.kmmysql({
  connectionLimit: 10
});

var KModel = function() {
  "use strict";

  function KModel() {
    this.id = -1;
    __client.createConnection('localhost', 'root', 'S4t4dmin', 'test', function(err) {
      if (err) {
        throw err;
      }
    });
    return this;
  } //end of function


  this.find = function() {
    console.log(Object.keys(this));
  };
};

module.exports.KModel = KModel;
