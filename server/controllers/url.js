'use strict';
var URL = require('../models/URL.js'),
	utils = require('../utils.js');

module.exports = {
	createURL: function (req, res) {
		utils.validateHttpURL(req.body.orgURL, function (url) {
			utils.validateCreateURL(url, function (err) {
				if (err.length >= 1) {
					return res.status(200).json({'success': false, 'err': err});
				} else {
					var userIP = req.connection.remoteAddress;
					URL.addURL(url, userIP, function (err, result) {
						if (err) {
							return res.status(200).json({'success': false, 'err': err});
						} else if (result && result.url_original && result.url_modify) {
							return res.status(200).json({'success': true, 'res': result});
						} else {
							return res.status(200).json({'success': false });
						}
					});
				}
			});
		});
	},

	getURLStats: function (req, res) {
		var modURL = req.params.modURL;
		utils.validateGoToURL(modURL, function (err) {
			if (err.length >= 1) {
				return res.status(200).json({'success': false, 'err': err});
			} else {
				URL.getURLStats(modURL, function (err, result) {
					if (err) {
						return res.status(200).json({'success': false, 'err': err});
					} else if (result && result.url_original) {
						return res.status(200).json({'success': true, 'res': result});
					} else {
						return res.status(200).json({'success': false});
					}
				});
			}
		});
	},

	goToURL: function (req, res) {
		var modURL = req.params.modURL;
		utils.validateGoToURL(modURL, function (err) {
			if (err.length >= 1) {
				return res.status(200).json({'success': false, 'err': err});
			} else {
				URL.goToURL(modURL, function (err, result) {
					if (err) {
						return res.status(200).json({'success': false, 'err': err});
					} else if (result && result.url_original) {
						res.redirect(302, result.url_original);
						return res.end();
					} else {
						return res.status(200).json({'success': false});
					}
				});
			}
		});
	}
};
