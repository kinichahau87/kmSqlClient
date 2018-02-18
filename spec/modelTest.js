var __kmModel = require("../src/kmModel");
var trigTest = require("./models/trigtest");



describe("A model extension", function() {
	beforeEach(function(done) {
		setTimeout(function() {
			done();
		}, 1);
	});


	it("should do simple query", function(done) {
		var model = new __kmModel({
			"id": 0,
			"message": "",
			"client_name": ""
		});

		model.setViewName("TRIGTEST");
		//will get all records
		var promisefind = model.find();
		promisefind.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();

			done();
		}).catch(reason => {
			fail(reason);
		});
	}); //end of it

	it("should do where clause", function(done) {
		var model = new __kmModel(trigTest);

		//find records where message='command to test insert'
		var findPromise = model.find({
			"message": {
				"=": "command to test insert"
			}
		});
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].message).toEqual("command to test insert");

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do where clause with extending a model", function(done) {

		var model = new __kmModel(trigTest);

		var findPromise = model.find({
			"message": {
				"=": "command to test insert"
			}
		});
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].message).toEqual("command to test insert");

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do where and clause", function(done) {
		var model = new __kmModel(trigTest);

		var findPromise = model.find({
			"message": {
				"=": "command to test insert"
			},
			"client_name": {
				"=": "jasmine-unit-test"
			}
		});
		findPromise.then(results => {
			expect(results).not.toBe(true);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].message).toEqual("command to test insert");

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();

			expect(results[0].client_name).toEqual("jasmine-unit-test");

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do like clause", function(done) {
		var model = new __kmModel(trigTest);

		var findPromise = model.find({
			"message": {
				"like": "%command to test insert%"
			}
		});
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].message).toEqual("command to test insert");

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do where and like clause", function(done) {
		var model = new __kmModel(trigTest);

		var findPromise = model.find({
			"message": {
				"=": "command to test insert"
			},
			"client_name": {
				"like": "%jasmine-unit-test%"
			}
		});
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].message).toEqual("command to test insert");

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();

			expect(results[0].client_name).toEqual("jasmine-unit-test");

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do where and not like clause", function(done) {
		var model = new __kmModel(trigTest);

		var findPromise = model.find({
			"message": {
				"=": "command to test insert"
			},
			"client_name": {
				"not like": "%null%"
			}
		});
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].message).toEqual("command to test insert");

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do insert", function(done) {
		var model = new __kmModel(trigTest);

		var findPromise = model.create();

		findPromise.then(results => {

			expect(results).not.toBe(null);

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do update", function(done) {
		var model = new __kmModel(trigTest);

		model.setId(1);

		var findPromise = model.update({
			"id": {
				"=": 1
			}
		});

		findPromise.then(results => {

			expect(results).not.toBe(null);

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do delete", function(done) {
		var model = new __kmModel(trigTest);

		var findPromise = model.del({
			"client_name": {
				"=": "jasmine test"
			}
		});

		findPromise.then(results => {

			expect(results).not.toBe(null);

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do call", function(done) {
		var model = new __kmModel({
			"con": 1
		}, "p");

		var findPromise = model.callp();
		findPromise.then(results => {

			expect(results).not.toBe(null);

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do call 2", function(done) {
		var model = new __kmModel({}, "p2");

		var findPromise = model.callp();
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();

			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should not have empty table name", function(done) {
		var model = new __kmModel();

		var findPromise = model.find();

		findPromise.then(results => {

			expect(results).not.toBe(null);
			fail("should throw exception");
			done();
		}).catch(reason => {

			expect(reason).not.toBe(null);
			done();
		});
	});


	it("should not execute invalid clause", function(done) {
		var model = new __kmModel(trigTest);

		var findPromise = model.find({
			"message": {
				"not": "hello"
			}
		});

		findPromise.then(results => {
			fail("should throw exception: " + results);
			done();
		}).catch(reason => {


			expect(reason).not.toBe(null);
			done();
		});
	});

	afterEach(function(done) {
		setTimeout(function() {
			done();
		}, 10);
	}); //end of aftereach

	afterAll(function(done) {

		let model = new __kmModel();
		model.shutdown((err) => {
			if (err)
				throw err;

			done();
		});
	});

});
