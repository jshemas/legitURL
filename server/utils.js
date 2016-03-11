'use strict';

module.exports = {
	/*
	 * validateCreateURL is used in 'CreateURL'
	 */
	validateCreateURL: function (originalURL, callback) {
		var originalURLRes = this.validateURL(originalURL),
			errArr = [];
		if (originalURLRes) {
			errArr.push(originalURLRes);
		}
		callback(errArr);
	},

	/*
	 * validateGoToURL is used in 'goToURL'
	 */
	validateGoToURL: function (modifyURL, callback) {
		var modifyURLRes = this.validateVar(modifyURL),
			errArr = [];
		if (!modifyURLRes) {
			errArr.push(modifyURLRes);
		}
		callback(errArr);
	},

	/*
	 * validate var
	 * @param string var - user input
	 */
	validateVar: function (inputVar) {
		if (inputVar === null || (inputVar && inputVar.length < 1) || typeof inputVar === 'undefined' || !inputVar) {
			return false;
		} else {
			return true;
		}
	},

	/*
	 * validate http url - all urls must have http:// in front of them
	 * @param string var - the url
	 * @param function callback
	 */
	validateHttpURL: function (inputUrl, callback) {
		if (!/^(f|ht)tps?:\/\//i.test(inputUrl)) {
			inputUrl = 'http://' + inputUrl;
		}
		callback(inputUrl);
	},

	/**
	 * validate url
	 * @param string url - user input: url
	 */
	validateURL: function (url) {
		if (this.validateVar(url)) {
			var regex =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
			if (regex.test(url)) {
				return;
			} else {
				return 'Invalid URL';
			}
		} else {
			return 'Invalid URL';
		}
	},

	/**
	 * generate string
	 * @param string url - user input: url
	 */
	generateString: function (count, callback) {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		for (var i = 0; i < count; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		callback(text);
	}
};
