var __kmModel = require("../src/kmModel");
var __poolClient = require("../src/dbManager").init("pool1");
var executions = 0;
describe("A model extension", function() {
	beforeEach(function(done) {
		setTimeout(function() {
			done();
		}, 1);
	});


	it("should do simple query", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "",
			"client_name": ""
		}, __poolClient);

		model.setViewName("trigtest");
		model.message = "hello world";
		var promisefind = model.find();
		promisefind.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].MESSAGE).not.toBeUndefined();

			expect(results[0].ID).not.toBeUndefined();

			expect(results[0].CLIENT_NAME).not.toBeUndefined();
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});
	}); //end of it

	it("should do where clause", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "",
			"client_name": ""
		}, __poolClient, "trigtest");

		var findPromise = model.find({
			"message": {
				"=": "command to test insert"
			}
		});
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].MESSAGE).not.toBeUndefined();

			expect(results[0].ID).not.toBeUndefined();

			expect(results[0].CLIENT_NAME).not.toBeUndefined();
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do where and clause", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "",
			"client_name": ""
		}, __poolClient, "trigtest");

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

			expect(results[0].MESSAGE).not.toBeUndefined();

			expect(results[0].ID).not.toBeUndefined();

			expect(results[0].CLIENT_NAME).not.toBeUndefined();
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do like clause", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "",
			"client_name": ""
		}, __poolClient, "trigtest");

		var findPromise = model.find({
			"message": {
				"like": "%command to test insert%"
			}
		});
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].MESSAGE).not.toBeUndefined();

			expect(results[0].ID).not.toBeUndefined();

			expect(results[0].CLIENT_NAME).not.toBeUndefined();
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do where and like clause", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "",
			"client_name": ""
		}, __poolClient, "trigtest");

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

			expect(results[0].MESSAGE).not.toBeUndefined();

			expect(results[0].ID).not.toBeUndefined();

			expect(results[0].CLIENT_NAME).not.toBeUndefined();
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do where and not like clause", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "",
			"client_name": ""
		}, __poolClient, "trigtest");

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

			expect(results[0].MESSAGE).not.toBeUndefined();

			expect(results[0].ID).not.toBeUndefined();

			expect(results[0].CLIENT_NAME).not.toBeUndefined();
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do insert", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "hello from test",
			"client_name": "jasmine test"
		}, __poolClient, "trigtest");

		var findPromise = model.create();

		findPromise.then(results => {

			expect(results).not.toBe(null);
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do update", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "hello from test",
			"client_name": "jasmine test"
		}, __poolClient, "trigtest");

		model.setId(1);

		var findPromise = model.update({
			"id": {
				"=": 1
			}
		});

		findPromise.then(results => {

			expect(results).not.toBe(null);
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do delete", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "hello from test",
			"client_name": "jasmine test"
		}, __poolClient, "trigtest");

		var findPromise = model.del({
			"client_name": {
				"=": "jasmine test"
			}
		});

		findPromise.then(results => {

			expect(results).not.toBe(null);
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do call", function(done) {
		var model = new __kmModel.KModel({
			"aint": 1
		}, __poolClient, "p");

		var findPromise = model.callp();
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0]["VERSION()"]).not.toBeUndefined();
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should do call 2", function(done) {
		var model = new __kmModel.KModel({}, __poolClient, "p2");

		var findPromise = model.callp();
		findPromise.then(results => {

			expect(results).not.toBe(null);

			expect(results[0].message).not.toBeUndefined();

			expect(results[0].id).not.toBeUndefined();

			expect(results[0].client_name).not.toBeUndefined();
			executions++;
			done();
		}).catch(reason => {
			fail(reason);
		});

	}); //end of it

	it("should not have empty table name", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "hello from test",
			"client_name": "jasmine test"
		}, __poolClient);

		var findPromise = model.find();

		findPromise.then(results => {

			expect(results).not.toBe(null);
			fail("should throw exception");
			done();
		}).catch(reason => {
			executions++;

			expect(reason).not.toBe(null);
			done();
		});
	});

	it("should have conneciton pool set", function(done) {
		try {
			var model = new __kmModel.KModel({
				"id": 0,
				"message": "hello from test",
				"client_name": "jasmine test"
			});
			fail("should throw exception with: " + model);
		} catch (error) {
			executions++;

			expect(error).not.toBe(null);
			done();
		}

	});

	it("should not execute invalid clause", function(done) {
		var model = new __kmModel.KModel({
			"id": 0,
			"message": "hello from test",
			"client_name": "jasmine test"
		}, __poolClient, "trigtest");

		var findPromise = model.find({
			"message": {
				"not": "hello"
			}
		});

		findPromise.then(results => {
			fail("should throw exception: " + results);
			done();
		}).catch(reason => {
			executions++;

			expect(reason).not.toBe(null);
			done();
		});
	});

	afterEach(function(done) {
		setTimeout(function() {
			if (executions == 13) {
				__poolClient.shutdown(function(err) {
					if (err) {
						//error
					}
					done();
				});
			} else {
				done();
			}
		}, 10);
	}); //end of aftereach

});