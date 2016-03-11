var request = require('supertest'),
	app = require('../../app'),
	supertest = request(app),
	Expect = require('Expect.js');

//test url formats
var	options1 = {
		'orgURL': 'http://www.google.com'
	},
	options2 = {
		'orgURL': 'http://www.google.com/'
	},
	options3 = {
		'orgURL': 'https://www.google.com/'
	},
	options4 = {
		'orgURL': 'www.google.com/'
	},
	options5 = {
		'orgURL': 'google.com/'
	},
	options6 = {
		'orgURL': 'http://google.com/'
	};

//invaild url
var options7 = {
	'orgURL': 'http://testtesttest4564568.com'
};

// some bad urls
var options8 = {
		'orgURL': 23233
	},
	options9 = {
		'orgURL': '2323233'
	},
	options10 = {
		'orgURL': 'this is a testt'
	};

// used for stats
var options11 = {
	'orgURL': 'http://www.google.com'
};

//empty value
var optionsEmpty = {
	'orgURL': ''
};

//no url
var optionsNoUrl = { };

var mod_url1, mod_url2, mod_url3, mod_url4, mod_url5, mod_url6, mod_url7, mod_url11;

afterEach(function () {
	setTimeout(function () {
		// delay for 500ms, too many open file/connections
	}, 500);
});

describe('Build URL - ', function () {
	it('options1', function (done) {
		supertest.post('/createURL').send(options1).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options1.orgURL);
			mod_url1 = result.body.res.url_modify;
			done();
		});
	});
	it('options2', function (done) {
		supertest.post('/createURL').send(options2).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options2.orgURL);
			mod_url2 = result.body.res.url_modify;
			done();
		});
	});
	it('options3', function (done) {
		supertest.post('/createURL').send(options3).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options3.orgURL);
			mod_url3 = result.body.res.url_modify;
			done();
		});
	});
	it('options4', function (done) {
		supertest.post('/createURL').send(options4).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be('http://' + options4.orgURL);
			mod_url4 = result.body.res.url_modify;
			done();
		});
	});
	it('options5', function (done) {
		supertest.post('/createURL').send(options5).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be('http://' + options5.orgURL);
			mod_url5 = result.body.res.url_modify;
			done();
		});
	});
	it('options6', function (done) {
		supertest.post('/createURL').send(options6).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options6.orgURL);
			mod_url6 = result.body.res.url_modify;
			done();
		});
	});
	it('options7', function (done) {
		supertest.post('/createURL').send(options7).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options7.orgURL);
			mod_url7 = result.body.res.url_modify;
			done();
		});
	});
	it('options8', function (done) {
		supertest.post('/createURL').send(options8).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('options9', function (done) {
		supertest.post('/createURL').send(options9).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('options10', function (done) {
		supertest.post('/createURL').send(options10).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('optionsEmpty', function (done) {
		supertest.post('/createURL').send(optionsEmpty).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('optionsNoUrl', function (done) {
		supertest.post('/createURL').send(optionsNoUrl).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.err[0]).to.be('Invalid URL');
			done();
		});
	});
	it('options11', function (done) {
		supertest.post('/createURL').send(options11).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options11.orgURL);
			mod_url11 = result.body.res.url_modify;
			done();
		});
	});
});

describe('Go To URL - ', function () {
	it('options1', function (done) {
		supertest.get('/goto/' + mod_url1).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(options1.orgURL);
			done();
		});
	});
	it('options2', function (done) {
		supertest.get('/goto/' + mod_url2).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(options2.orgURL);
			done();
		});
	});
	it('options3', function (done) {
		supertest.get('/goto/' + mod_url3).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(options3.orgURL);
			done();
		});
	});
	it('options4', function (done) {
		supertest.get('/goto/' + mod_url4).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be('http://' + options4.orgURL);
			done();
		});
	});
	it('options5', function (done) {
		supertest.get('/goto/' + mod_url5).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be('http://' + options5.orgURL);
			done();
		});
	});
	it('options6', function (done) {
		supertest.get('/goto/' + mod_url6).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(options6.orgURL);
			done();
		});
	});
	it('options7', function (done) {
		supertest.get('/goto/' + mod_url7).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(options7.orgURL);
			done();
		});
	});
	it('optionsNoModURL', function (done) {
		supertest.get('/goto/').end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			done();
		});
	});
	it('optionsBadModURL1', function (done) {
		supertest.get('/goto/' + 'omggg').end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			done();
		});
	});
	it('optionsBadModURL2', function (done) {
		supertest.get('/goto/' + 132).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			done();
		});
	});
});

describe('Get URL Stats - ', function () {
	it('round 1', function (done) {
		supertest.get('/stats/' + mod_url11).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options11.orgURL);
			Expect(result.body.res.url_hit_count).to.be(0);
			done();
		});
	});
	it('ding 1', function (done) {
		supertest.get('/goto/' + mod_url11).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(options11.orgURL);
			done();
		});
	});
	it('round 2', function (done) {
		supertest.get('/stats/' + mod_url11).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options11.orgURL);
			Expect(result.body.res.url_hit_count).to.be(1);
			done();
		});
	});
	it('ding 2', function (done) {
		supertest.get('/goto/' + mod_url11).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(options11.orgURL);
			done();
		});
	});
	it('ding 3', function (done) {
		supertest.get('/goto/' + mod_url11).end(function (err, result) {
			Expect(result.res.statusCode).to.be(302);
			Expect(result.res.headers.location).to.be(options11.orgURL);
			done();
		});
	});
	it('round 3', function (done) {
		supertest.get('/stats/' + mod_url11).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.url_original).to.be(options11.orgURL);
			Expect(result.body.res.url_hit_count).to.be(3);
			done();
		});
	});
	it('optionsNoModURL', function (done) {
		supertest.get('/stats/').end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			done();
		});
	});
	it('optionsBadModURL1', function (done) {
		supertest.get('/stats/' + 'omggg').end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			done();
		});
	});
	it('optionsBadModURL2', function (done) {
		supertest.get('/stats/' + 132).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			done();
		});
	});
});
