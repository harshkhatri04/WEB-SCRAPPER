let expect = require('chai').expect;
let request = require('supertest');
let sinon = require('sinon');
let App = require('./../index');

let model = require('./../models/userModel');

let insertStub = sinon.stub(model.prototype, 'save')

describe('Insert', () => {
    before(() => {
        insertStub.yields(null, {
            name: "Pulkit",
            password: "Pulkit@123",
            email: "Pulkit176@gmail.com",
            mobile: 9799999900
        });
    })
    it('respond with json', (done) => {
        console.log('inside insert Test');
        request(App)
            .post('/api/users')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    console.log(res.body);
                    expect(res.body.name).to.be.equal("Pulkit");
                    done();
                }
            });
    });
});
