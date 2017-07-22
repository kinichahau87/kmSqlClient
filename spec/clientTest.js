var client = require("../src/index");


describe("A connection", function() {
	var pleasework = new client.kmmysql({
		connectionLimit: 20
	});
	pleasework.createConnection("10.103.2.52", "NODEUSER", "somepass", "test", function(err) {
		it("should not fail", function() {
			if (err) {
				fail("failed to connect to pool");
			}
		});
		//should be connected
		it("should be connected", function() {
			expect(pleasework.IsConnected()).toBe(true);
		});
		//should query and shutdown
		it("should query and shutdown", function() {
			try {
				pleasework.query("SELECT * FROM TRIGTEST", [], function(err, results) {
					describe("executing query", function() {
						it("should execute without error", function() {
							if (err) {
								fail("failed: " + err);
							}

							expect(results instanceof Array).toBe(true);

							expect(results[0].message).not.toBeUndefined();
						});
					});
				});
			} catch (error) {
				fail("test failed: " + error);
			} //end of catch
		}); //end of it

		//should query and shutdown
		it("should query clause and shutdown", function() {
			pleasework.query("SELECT * FROM TRIGTEST WHERE message = ?", ["16"], function(err, results) {
				describe("executing complex query", function() {
					it("should execute clause without error", function() {
						if (err) {
							fail("failed: " + err);
						}

						expect(results instanceof Array).toBe(true);


						expect(results.length).toBeGreaterThan(1);
					});
				});
			});
		}); //end of it

		//should query more and shutdown
		it("should query more and shutdown", function() {
			pleasework.query("SELECT * FROM TRIGTEST WHERE message = ? AND client_name = ?", ["message from new producer", "NewProcClient"], function(err, results) {
				describe("executing more complex query", function() {
					it("should  more execute without error", function() {
						if (err) {
							fail("failed: " + err);
						}

						expect(results instanceof Array).toBe(true);

						expect(results.length).toBeGreaterThan(1);
					});
				});
			}); //end of query
		}); //end of it

		//shoud insert and shutdown
		it("shoud insert and shutdown", function() {
			pleasework.query("INSERT INTO TRIGTEST SET ?", {
				message: "command to test insert",
				client_name: "jasmine-unit-test"
			}, function(err, results) {
				describe("executing insert", function() {
					it("should insert and shutdown", function() {
						if (err) {
							fail("failed: " + err);
						}

						expect(results instanceof Array).toBe(true);

						expect(results.length).toBeGreaterThan(1);

						expect(results[0].affectedRows).toBe(1);
					});
				}); //end of describe
			}); //end of insert
		}); //end of it

		//should update and shutdown
		it("should update and shutdown", function() {
			pleasework.query("UPDATE TRIGTEST SET MESSAGE = ?, CLIENT_NAME=? WHERE CLIENT_NAME=?", ["command sent from jasmine test update", "jasmine-unit-test", "jasmine-unit-test"], function(err, results) {
				describe("executing update", function() {
					it("should execute 2 clause without error", function() {
						if (err) {
							fail("failed: " + err);
						}

						expect(results instanceof Array).toBe(true);

						expect(results.length).toBeGreaterThan(1);

						expect(results[0].affectedRows).toBeGreaterThan(1);
					});
				});
			}); //end of query
		}); //end of it

		//should delete and shutdown
		it("should delete and shutdown", function() {
			pleasework.query("DELETE FROM TRIGTEST WHERE CLIENT_NAME = ?", ["jasmine-unit-test"], function(err, results) {
				describe("execute delete", function() {
					it("should execute wihtout error", function() {
						if (err) {
							fail("failed: " + err);
						}

						expect(results instanceof Array).toBe(true);

						expect(results.length).toBeGreaterThan(1);

						expect(results[0].affectedRows).toBeGreaterThan(1);
					}); //end of it
				}); //end of describe
			}); //end of query
		}); //end if it

		//should call and shutdown
		it("should call and shutdown", function() {
			pleasework.query("call p(?)", [1], function(err, results) {
				describe("execute p", function() {
					it("should execute call wihtout error", function() {
						if (err) {
							fail("failed: " + err);
						}

						expect(err).toBe(null);

						expect(results instanceof Array).toBe(true);

						expect(results.length).toBeGreaterThan(1);
					}); //end of it
				}); //end of describe
			}); //end of query
		}); //end if it

		//should query and shutdown
		it("should query bad table and shutdown", function() {
			pleasework.query("SELECT * from table_doesnt_exist", null, function(sql_err) {
				describe("executing bad query", function() {
					it("should throw expection", function() {

						expect(sql_err).not.toBe(null);
					});
				});
			});
		}); //end if it

		//should shutdown closing all conenctions
		it("should shutdown closing all conenctions", function() {
			pleasework.shutdown(function() {
				describe("connection closed", function() {
					it("should not be connected", function() {
						expect(pleasework.IsConnected()).toBe(true);
					});
					//should not connect with error
					it("should not connect with error", function() {
						var badConnection = new client.kmmysql();
						badConnection.createConnection("localhost", "root", "S4t4dmin", "database_dont_exist", function(err) {
							expect(err).not.toBe(null);
						});
					}); //end of it
				});
			}); //end of shutdown
		}); //end of it

	}); //end of connection
}); //end of describe