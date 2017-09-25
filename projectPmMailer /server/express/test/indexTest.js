let expect = require('chai').expect;
let request = require('supertest');
let sinon = require('sinon');
let App = require('./../index');

let model = require('./../models/userModel');

let insertStub = sinon.stub(model.prototype, 'save');
let modelStub = sinon.stub(model, 'find');

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

describe('GET /', () => {
    it('respond with json', (done) => {

        modelStub.yields(null, [{ name: "Pulkit", password: "Pulkit@123", email: "Pulkit176@gmail.com", mobile: 9799999999 }])
        request(App)
            .get('/api')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body[0].name).to.be.equal("Pulkit");
                done();
            })
    });
});

// login url
router.get('/signin/:email/:password', function(req, res) {
    User.findOne({
        email: req.params.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {

            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.params.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign({ user }, config.secret);
                    // return the information including token as JSON
                    res.send({ success: true, token: 'JWT ' + token });
                    //console.log({ success: true, token: 'JWT ' + token })*/
                } else {
                    //console.log("found")
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});