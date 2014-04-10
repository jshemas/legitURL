var app = require('../../app'),
	request = require('supertest');

describe('Index Test - ', function () {
	it('Homepage - Return a 200', function(done) {
		request(app).get('/').expect(200, done);
	});
});