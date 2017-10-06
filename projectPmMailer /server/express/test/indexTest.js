let expect = require('chai').expect;
let request = require('supertest');
let sinon = require('sinon');
let App = require('./../index');

let model = require('./../models/userModel');
let detail = require('./../models/nasdaq')
let detailStub = sinon.stub(detail, 'find')
let insertStub = sinon.stub(model.prototype, 'save');
let modelStub = sinon.stub(model, 'find');
let findStub = sinon.stub(model, 'findOne')

describe('POST /users', () => {
	before(() => {
		insertStub.yields(null, {
			name: "Pulkit",
			password: "Pulkit@123",
			email: "Pulkit176@gmail.com",
			mobile: 9799999900
		});
	})
	it('respond with json', (done) => {
		request(App)
			.post('/api/users')
			.send({
				name: "Pulkit",
				password: "Pulkit@123",
				email: "Pulkit176@gmail.com",
				mobile: 9799999900
			})
			.end((err, res) => {

				if (err) return err;
				else {
					expect(res.body).to.be.equal(" success: true, message: 'user created' ");
					done();
				}
			});
	});
});

describe('GET /', () => {
	it('respond with json', (done) => {

		modelStub.yields(null, { name: "Pulkit", password: "Pulkit@123", email: "Pulkit176@gmail.com", mobile: 9799999999 })
		request(App)
			.get('/api')
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body.name).to.be.equal("Pulkit");
				done();
			})
	});
});

describe('GET /signin/:email/:password', () => {
	it('respond with json', (done) => {
		findStub.withArgs({ 'email': 'Pulkit176@gmail.com', 'password': 'Pulkit@123' })
			.yields(null, {
				name: "Pulkit",
				password: "Pulkit@123",
				email: "Pulkit@gmail.com",
				mobile: 9799999900
			})
		request(App)
			.get('/api/signin/Pulkit176@gmail.com/Pulkit@123')
			.end((err, res) => {
				if (err) {
					console.log('hello')
					return err;
				} else {
					expect(res.body).to.be.equal(" success: true, token: 'JWT ' + token ");
					done();
				}
				console.log('in end')
			})
	})
})

//test case for HTTP Get method for stock price of NASDAQ for WSJ website
describe('get method', () => {
	it('respond with json', (done) => {
		detailStub.yields(null, [{ Code: "100", Company: "abc" }])
		request(App)
			.get('/api/details')
			.expect('Content-Type', /json/)

			.end((err, res) => {
				if (err) return done(err);
				expect(res.body[0].Code).to.be.equal("100");
				expect(res.body[0].Company).to.be.equal("abc");
				done();
			});
	});
});