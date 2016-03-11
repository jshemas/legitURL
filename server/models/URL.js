'use strict';
var winston = require('winston'),
	mongoose = require('mongoose'),
	utils = require('../utils.js');

// URL Schema
var URLSchema = new mongoose.Schema({
	url_original: { type: String, required: true },
	url_modify: { type: String, required: true, index: true, unique: true },
	url_hit_count: { type: Number, default: 0, required: true },
	url_userIP: { type: String, required: true },
	url_date: { type: Date, default: Date.now }
});
URLSchema.set('autoIndex', false);

var URL = mongoose.model('URL', URLSchema);

module.exports = {
	addURL: function (originalURL, userIP, callback) {
		utils.generateString(3, function (randomString) {
			var modifyURL = randomString + Date.now(),
				obj = new URL({
					url_original: originalURL,
					url_modify: modifyURL,
					url_userIP: userIP
				});
			obj.save(function (err, res) {
				if (err) {
					winston.info('Error in addURL:' + err);
					callback('DB-err-addURL', null);
				} else {
					if (res && res._id) {
						var obj = {
							url_original: res.url_original,
							url_modify: res.url_modify
						};
						callback(null, obj);
					} else {
						callback('err-in-addURL', null);
					}
				}
			});
		});
	},

	getURLStats: function (modifyURL, callback) {
		var query = URL.findOne({url_modify: modifyURL});
		query.select('_id url_original url_modify url_hit_count url_date');
		query.exec(function (err, res) {
			if (err) {
				winston.info('Error in getURLStats:' + err);
				callback('DB-err-getURLStats', null);
			} else {
				if (res && res._id) {
					var obj = {
						_id: res._id,
						url_original: res.url_original,
						url_modify: res.url_modify,
						url_hit_count: res.url_hit_count,
						url_date: res.url_date
					};
					callback(null, obj);
				} else {
					callback('noURLFound', null);
				}
			}
		});
	},

	goToURL: function (modifyURL, callback) {
		var query = { url_modify: modifyURL },
			update = { $inc: { url_hit_count: 1 }},
			options = {upsert: false};
		URL.findOneAndUpdate(query, update, options, function (err, res) {
			if (err) {
				winston.info('Error in goToURL:' + err);
				callback('DB-err-goToURL', null);
			} else {
				if (res && res.url_original) {
					var obj = {
						url_original: res.url_original
					};
					callback(null, obj);
				} else {
					callback('noURLFound', null);
				}
			}
		});
	}
};
