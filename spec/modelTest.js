var __kmModel = require('../src/kmModel');
var __extend = require('extend');

describe("A model extension", function() {
  var extendObj = {};
  var model = new __kmModel.KModel();  
  __extend(extendObj, model);
  extendObj.find();

});
