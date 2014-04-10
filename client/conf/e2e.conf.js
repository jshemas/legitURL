// need to run this to download the standalone selenium server
// ./node_modules/protractor/bin/webdriver-manager update
exports.config = {
	allScriptsTimeout: 11000,
	specs: [
		'../tests/e2e/general.js'
	],
	capabilities: {
		'browserName': 'chrome'
	},
	baseUrl: 'http://localhost:8080/',
	framework: 'jasmine',
	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};