var request = require('supertest'),
	app = require('../../app'),
	supertest = request(app),
	Expect = require('Expect.js');

// test differnt URL formats
var	validURLHttp = {
		'orgURL': 'http://www.google.com'
	},
	validURLHttps = {
		'orgURL': 'https://www.google.com'
	},
	validURLNoProtocol = {
		'orgURL': 'www.google.com'
	},
	validURLNoProtocolNoWWW = {
		'orgURL': 'google.com'
	},
	validURLWithProtocolNoWWW = {
		'orgURL': 'http://google.com/'
	};

// invalid urls
var invalidURLNumber = {
		'orgURL': 23233
	},
	invalidURLNumberString = {
		'orgURL': '2323233'
	},
	invalidURLString = {
		'orgURL': 'this is a testt'
	};

// empty value
var invalidURLEmpty = {
	'orgURL': ''
};

// no url
var invalidURLNoUrl = { };

// used for stats
var validURLStats = {
	'orgURL': 'http://www.google.com'
};

var validURLHttpRes, validURLHttpsRes, validURLNoProtocolRes, validURLNoProtocolNoWWWRes, validURLWithProtocolNoWWWRes, validURLStatsRes;

afterEach(function () {
	setTimeout(function () {
		// delay for 500ms, too many open file/connections
	}, 500);
});

describe('URL Test - ', function () {
	it('build validURLHttp', function (done) {
		supertest.post('/createURL').send(validURLHttp).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(validURLHttp.orgURL);
			validURLHttpRes = result.body.res.url_modify;
			done();
		});
	});
	it('go to validURLHttp', function (done) {
		supertest.get('/goto/' + validURLHttpRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(validURLHttp.orgURL);
			done();
		});
	});
	it('build validURLHttps', function (done) {
		supertest.post('/createURL').send(validURLHttps).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(validURLHttps.orgURL);
			validURLHttpsRes = result.body.res.url_modify;
			done();
		});
	});
	it('go to validURLHttps', function (done) {
		supertest.get('/goto/' + validURLHttpsRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(validURLHttps.orgURL);
			done();
		});
	});
	it('build validURLNoProtocol', function (done) {
		supertest.post('/createURL').send(validURLNoProtocol).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be('http://' + validURLNoProtocol.orgURL);
			validURLNoProtocolRes = result.body.res.url_modify;
			done();
		});
	});
	it('go to validURLNoProtocol', function (done) {
		supertest.get('/goto/' + validURLNoProtocolRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be('http://' + validURLNoProtocol.orgURL);
			done();
		});
	});
	it('build validURLNoProtocolNoWWW', function (done) {
		supertest.post('/createURL').send(validURLNoProtocolNoWWW).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be('http://' + validURLNoProtocolNoWWW.orgURL);
			validURLNoProtocolNoWWWRes = result.body.res.url_modify;
			done();
		});
	});
	it('go to validURLNoProtocolNoWWW', function (done) {
		supertest.get('/goto/' + validURLNoProtocolNoWWWRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be('http://' + validURLNoProtocolNoWWW.orgURL);
			done();
		});
	});
	it('build validURLWithProtocolNoWWW', function (done) {
		supertest.post('/createURL').send(validURLWithProtocolNoWWW).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(validURLWithProtocolNoWWW.orgURL);
			validURLWithProtocolNoWWWRes = result.body.res.url_modify;
			done();
		});
	});
	it('go to validURLWithProtocolNoWWW', function (done) {
		supertest.get('/goto/' + validURLWithProtocolNoWWWRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(validURLWithProtocolNoWWW.orgURL);
			done();
		});
	});
	it('invalid url - invalidURLNumber', function (done) {
		supertest.post('/createURL').send(invalidURLNumber).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('invalid url - invalidURLNumberString', function (done) {
		supertest.post('/createURL').send(invalidURLNumberString).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('invalid url - invalidURLString', function (done) {
		supertest.post('/createURL').send(invalidURLString).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('invalid url - invalidURLEmpty', function (done) {
		supertest.post('/createURL').send(invalidURLEmpty).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('invalid url - invalidURLNoUrl', function (done) {
		supertest.post('/createURL').send(invalidURLNoUrl).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('invalid got to nothing', function (done) {
		supertest.get('/goto/').end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be(false);
			done();
		});
	});
	it('invalid got to string', function (done) {
		supertest.get('/goto/test123').end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err).to.be('noURLFound');
			done();
		});
	});
	it('invalid got to number', function (done) {
		supertest.get('/goto/test' + 123).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err).to.be('noURLFound');
			done();
		});
	});
});

describe('Test URL Stats - ', function () {
	it('build validURLStats', function (done) {
		supertest.post('/createURL').send(validURLStats).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(validURLStats.orgURL);
			validURLStatsRes = result.body.res.url_modify;
			done();
		});
	});
	it('stats should be zero', function (done) {
		supertest.get('/stats/' + validURLStatsRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(validURLStats.orgURL);
			Expect(result.body.res.url_hit_count).to.be(0);
			done();
		});
	});
	it('ping url - 1', function (done) {
		supertest.get('/goto/' + validURLStatsRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(validURLStats.orgURL);
			done();
		});
	});
	it('stats should be one', function (done) {
		supertest.get('/stats/' + validURLStatsRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(validURLStats.orgURL);
			Expect(result.body.res.url_hit_count).to.be(1);
			done();
		});
	});
	it('ping url - 2', function (done) {
		supertest.get('/goto/' + validURLStatsRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(validURLStats.orgURL);
			done();
		});
	});
	it('ping url - 3', function (done) {
		supertest.get('/goto/' + validURLStatsRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(validURLStats.orgURL);
			done();
		});
	});
	it('stats should be three', function (done) {
		supertest.get('/stats/' + validURLStatsRes).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(validURLStats.orgURL);
			Expect(result.body.res.url_hit_count).to.be(3);
			done();
		});
	});
	it('invalid - nothing', function (done) {
		supertest.get('/stats/').end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be(false);
			done();
		});
	});
	it('invalid - string', function (done) {
		supertest.get('/stats/' + 'omggg').end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err).to.be('noURLFound');
			done();
		});
	});
	it('invalid - number', function (done) {
		supertest.get('/stats/' + 132).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err).to.be('noURLFound');
			done();
		});
	});
});
