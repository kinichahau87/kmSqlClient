var __kmModel = require('../src/kmModel');

describe("A model extension", function() {
  it("should extend", function() {
    var model = new __kmModel.KModel({
      'message': '',
      'client_name': ''
    });

    model.setViewName('trigtest');
    model.message = "hello world";
    model.find(null, function(err, results) {

      it("should find ok", function() {
        if (err) {
          fail("error while executing test" + err);
        }
        console.log(results);
        expect(results != null).toBe(true);
      });
    });
  });

});