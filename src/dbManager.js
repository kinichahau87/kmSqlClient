var __client = require("./index");
var __config = require("config");

module.exports = {
	init: function(name) {
		var options = {};
		if (__config.has("db.Config.connectionLimit")) {
			options.connectionLimit = __config.get("dbConfig.connectionLimit");
		}
		var __clientdb = __client.kmmysql(options);
		__clientdb.createConnection(
			__config.get("dbConfig.host"),
			__config.get("dbConfig.user"),
			__config.get("dbConfig.password"),
			__config.get("dbConfig.dbName"),
			function(err) {
				if (err) {
					throw err;
				}
			});

		module.exports[name] = __clientdb;
		return module.exports[name];
	}
};