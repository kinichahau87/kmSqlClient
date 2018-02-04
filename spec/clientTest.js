var client = require("../src/index");


describe("A connection", function() {
	var mClient = new client({
		connectionLimit: 20
	});

	beforeEach(function(done) {
		setTimeout(function() {
			done();
		}, 1);
	});
	mClient.createConnection("localhost", "root", "sjsu2011", "test", function(err) {
		it("should not fail", function(done) {
			if (err) {
				fail("failed to connect to pool");
			}
			done();
		});
		//should be connected
		it("should be connected", function(done) {
			expect(mClient.IsConnected()).toBe(true);
			done();
		});
		//should query and shutdown
		it("should query and shutdown", function(done) {
			try {
				mClient.query("SELECT * FROM TRIGTEST", [], function(err, results) {
					if (err) {
						fail("failed: " + err);
					}

					expect(results instanceof Array).toBe(true);

					expect(results[0].message).not.toBeUndefined();
					done();
				});
			} catch (error) {
				fail("test failed: " + error);
			} //end of catch
		}); //end of it

		//should query and shutdown
		it("should query clause and shutdown", function(done) {
			mClient.query("SELECT * FROM TRIGTEST WHERE message = ?", ["16"], function(err, results) {
				if (err) {
					fail("failed: " + err);
				}

				expect(results instanceof Array).toBe(true);


				expect(results.length).toBeGreaterThan(1);
				done();
			});

		}); //end of it

		//should query more and shutdown
		it("should query more and shutdown", function(done) {
			mClient.query("SELECT * FROM TRIGTEST WHERE message = ? AND client_name = ?", ["message from new producer", "NewProcClient"], function(err, results) {
				if (err) {
					fail("failed: " + err);
				}

				expect(results instanceof Array).toBe(true);

				expect(results.length).toBeGreaterThanOrEqual(1);
				done();

			}); //end of query
		}); //end of it

		//shoud insert and shutdown
		it("shoud insert and shutdown", function(done) {
			mClient.query("INSERT INTO TRIGTEST SET ?", {
				message: "command to test insert",
				client_name: "jasmine-unit-test"
			}, function(err, results) {
				if (err) {
					fail("failed: " + err);
				}

				expect(results instanceof Array).toBe(true);

				expect(results.length).toBeGreaterThanOrEqual(1);

				expect(results[0].affectedRows).toBe(1);
				done();
			}); //end of query
		}); //end of it

		//should update and shutdown
		it("should update and shutdown", function(done) {
			mClient.query("UPDATE TRIGTEST SET MESSAGE = ?, CLIENT_NAME=? WHERE CLIENT_NAME=?", ["test update", "jasmine-unit-test", "jasmine-unit-test"], function(err, results) {
				if (err) {
					fail("failed: " + err);
				}

				expect(results instanceof Array).toBe(true);

				expect(results.length).toBeGreaterThanOrEqual(1);

				expect(results[0].affectedRows).toBeGreaterThanOrEqual(1);
				done();
			}); //end of query

		}); //end of it

		//should delete and shutdown
		it("should delete and shutdown", function(done) {
			mClient.query("DELETE FROM TRIGTEST WHERE CLIENT_NAME = ?", ["jasmine-unit-test"], function(err, results) {
				if (err) {
					fail("failed: " + err);
				}

				expect(results instanceof Array).toBe(true);

				expect(results.length).toBeGreaterThanOrEqual(1);

				expect(results[0].affectedRows).toBeGreaterThanOrEqual(1);
				done();
			}); //end of query

		}); //end if it

		//should call and shutdown
		it("should call and shutdown", function(done) {
			mClient.query("call p(?)", [1], function(err, results) {
				if (err) {
					fail("failed: " + err);
				}

				expect(err).toBe(null);

				expect(results instanceof Array).toBe(true);

				expect(results.length).toBeGreaterThanOrEqual(1);
				done();
			}); //end of query

		}); //end if it

		//should query and shutdown
		it("should query bad table and shutdown", function(done) {
			mClient.query("SELECT * from table_doesnt_exist", null, function(sql_err) {
				expect(sql_err).not.toBe(null);
				done();
			});

		}); //end if it

		//should shutdown closing all conenctions
		it("should shutdown closing all conenctions", function(done) {
			mClient.shutdown(function(err) {
				if (err) {
					fail(err);
				}

				expect(mClient.IsConnected()).toBe(false);

				let badConnection = new client();
				badConnection.createConnection("localhost", "root", "S4t4dmin", "database_dont_exist", function() {
					badConnection.query("SELECT * from TRIGTEST", null, function(sql_err) {
						expect(sql_err).not.toBe(null);
						badConnection.shutdown(() => {
							done();
						});

					});
				});
			}); //end of shutdown
		}); //end of it

		afterEach(function(done) {
			setTimeout(function() {
				done();
			}, 10);
		}); //end of aftereach

		afterAll(function(done) {			
			mClient.shutdown((err) => {
				if (err)
					throw err;

				done();
			});
		});

	}); //end of connection
}); //end of describe
