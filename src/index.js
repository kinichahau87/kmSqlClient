var __mysql = require("mysql");

module.exports = (aOptions) => {
	"use strict";

	var mIsConnected = false;
	var mPool = null;
	var mNewConnection = null;
	var mConnectionLimit = 10;

	if (aOptions) {
		if (aOptions.connectionLimit) {
			mConnectionLimit = aOptions.connectionLimit;
		}
	}

	this.createConnection = (aHost, aUser, aPassword, aDatabase, aCallback) => {
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

	this.createNewConnection = (aHost, aUser, aPassword, aDatabase, aCallback) =>{
		try {
			mNewConnection = __mysql.createConnection({host: aHost, user: aUser, password: aPassword, database: aDatabase});
			return aCallback(true);
		} catch (e){
			mNewConnection = null;
			return aCallback(false, e);
		}
	};

	this.query = (aQuery, aValues, aCallback) =>{
		if (mNewConnection != null){
			mNewConnection.connect();
			mNewConnection.query(aQuery, aValues, (err, results) => {
				mNewConnection.end();
				if (err) {
					return aCallback(err, []);
				}
				return aCallback(err, proccessResults(results));
			});
		} else {
			mPool.getConnection((err, connection) => {
				if (err) {
					return aCallback(err, null);
				}
				connection.query(aQuery, aValues, (error, results) => {
					connection.release();
					if (error) {
						return aCallback(error, []);
					}
					return aCallback(error, proccessResults(results));
				});
			});
		}
	};


	function proccessResults(results) {
		var mResults = [];
		if (results.OkPacket) {
			mResults.push(results);
			return mResults;
		}
		for (let key in results) {
			let data = {};
			for (let rawKey in results[key]) {
				data[rawKey] = results[key][rawKey];
				if (data[rawKey] != null && data[rawKey].constructor.name == "RowDataPacket") {
					return proccessResults(results[key]);
				}
			} //end of for
			mResults.push(data);
		} //end of for

		return mResults;
	} //end of function


	this.shutdown = (aCallback) => {
		if (mPool != null){
			mPool.end((err) => {
				if (aCallback) {
					return aCallback(err);
				} else {
					return err;
				}
			});
		}
	}; //end of function

	this.IsConnected = () => {
		return mIsConnected;
	};

	return this;
}; //end of module
