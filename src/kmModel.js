var __Promise = require("promise");

var KModel = function(args, __pool, tableName) {
	"use strict";

	var mThis = this;
	var mViewName = "";
	var mSqlKeyWords = ["=", "like", "<", ">", "not like", ">=", "<=", "<>", "!="];

	if (args) {
		for (var arg in args) {
			this[arg] = args[arg];
		}
	} //end of if

	if (typeof __pool === "undefined" || __pool == null) {
		throw new Error("pool is not set", "KModel", 1);
	}

	if (tableName) {
		mViewName = tableName;
	}


	this.find = function(aClause) {
		return new __Promise(function(resolve, reject) {
			var propertiesValues = preparePropertyValues();

			var sql = prepareQuery(aClause, propertiesValues.properties);
			__pool.query(sql.sql, sql.values, function(err, results) {
				if (err) {
					reject(err);
				}
				resolve(results);
			}); //end of query
		}); //end of promise
	}; //end of find

	this.create = function() {
		return new __Promise(function(resolve, reject) {
			var propertiesValues = preparePropertyValues();
			var sql = prepareInsert(null, propertiesValues.properties, propertiesValues.values);
			__pool.query(sql.sql, sql.values, function(err, results) {
				if (err) {
					reject(err);
				}
				resolve(results);
			}); //end of query
		}); //end of promise
	}; //end of create

	this.update = function(aClause) {
		return new __Promise(function(resolve, reject) {
			var propertiesValues = preparePropertyValues();
			var sql = prepareUpdate(aClause, propertiesValues.properties, propertiesValues.values);
			__pool.query(sql.sql, sql.values, function(err, results) {
				if (err) {
					reject(err);
				}
				resolve(results);
			}); //end of query
		}); //end of promise
	}; //end of update

	this.del = function(aClause) {
		return new __Promise(function(resolve, reject) {
			var sql = prepareDelete(aClause);
			__pool.query(sql.sql, sql.values, function(err, results) {
				if (err) {
					reject(err);
				}
				resolve(results);
			});
		}); //end of promise
	}; //end of del

	this.callp = function() {
		return new __Promise(function(resolve, reject) {
			var propertiesValues = preparePropertyValues();
			var sql = prepareCall(propertiesValues.properties, propertiesValues.values);
			__pool.query(sql.sql, sql.values, function(err, results) {
				if (err) {
					reject(err);
				}
				resolve(results);
			});
		});
	};

	function prepareCall(properties, values) {
		var sql = [];
		var props = [];
		sql.push("CALL");
		for (var i = 0; i < properties.length; i++) {
			props.push("?");
		}
		sql.push(mViewName + "(" + props.join(", ") + ")");
		return {
			"sql": sql.join(" "),
			"values": values
		};
	}

	function prepareDelete(aClause) {
		validateName();
		var sql = [];
		sql.push("DELETE");
		sql.push("FROM");
		sql.push(mViewName);
		sql = prepareClause(sql, aClause);
		return sql;
	}

	function prepareUpdate(aClause, properties, values) {
		validateName();
		var sql = [];
		var updateProperties = [];
		sql.push("UPDATE");
		sql.push(mViewName);
		sql.push("SET");
		for (var i = 0; i < properties.length; i++) {
			updateProperties.push(properties[i] + " = ?");
		} //end of for
		sql.push(updateProperties.join(", "));
		sql = prepareClause(sql, aClause);
		sql.values = values.concat(sql.values);
		return sql;
	} //end of prepareUpdates

	function prepareInsert(aClause, properties, values) {
		validateName();
		var sql = [];
		var valuesClause = {};
		sql.push("INSERT");
		sql.push("INTO");
		sql.push(mViewName);
		sql.push("SET");
		sql.push("?");
		var sqlObj = prepareClause(sql, aClause);
		for (var i = 0; i < properties.length; i++) {
			valuesClause[properties[i]] = values[i];
		} //
		return {
			"sql": sqlObj.sql,
			"values": valuesClause
		};
	}

	function prepareQuery(aClause, properties) {
		validateName();
		var sql = [];
		sql.push("SELECT");
		sql.push(properties.join(", "));
		sql.push("FROM");
		sql.push(mViewName);

		sql = prepareClause(sql, aClause);
		return sql;
	}

	function prepareClause(sql, aClause) {
		var clauseConj = [];
		var values = [];
		if (aClause) {
			sql.push("WHERE");
			for (var key in aClause) {
				if (aClause.hasOwnProperty(key)) {
					let conj = aClause[key];
					let clauseAgg = [];
					clauseAgg.push(key);
					for (var i = 0; i < mSqlKeyWords.length; i++) {
						if (conj.hasOwnProperty(mSqlKeyWords[i])) {
							clauseAgg.push(mSqlKeyWords[i]);
							clauseAgg.push("?");
							values.push(conj[mSqlKeyWords[i]]);
						}
					}
					if (values.length == 0) {
						throw new Error("where clause not formed correctly. Current keywords supported: " + mSqlKeyWords.join(","));
					}
					clauseConj.push(clauseAgg.join(" "));
				} //end of if
			} //end of for
			sql.push(clauseConj.join(" AND "));
		} //end of if

		return {
			"sql": sql.join(" ").toUpperCase(),
			"values": values
		};
	}

	function preparePropertyValues() {
		var properties = [];
		var values = [];
		for (var key in mThis) {
			if (mThis.hasOwnProperty(key) && typeof(mThis[key]) !== "function") {
				properties.push(key);
				values.push(mThis[key]);
			}
		} //end of for
		return {
			"properties": properties,
			"values": values
		};
	}

	this.setViewName = function(aViewName) {
		mViewName = aViewName;
	};

	this.setId = function(aId) {
		mThis.id = aId;
	};

	function validateName() {
		if (typeof mViewName === "undefined" || mViewName == null) {
			throw new Error("table name not set. To set table name call setViewName('aTableName')");
		}
	}

	return this;
};

module.exports.KModel = KModel;