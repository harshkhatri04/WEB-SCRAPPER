let expect = require('chai').expect;
let request = require('supertest');
let sinon = require('sinon');
let App = require('./../index');

let model = require('./../models/userModel');
let detail = require('./../models/nasdaq');
let currency = require('./../models/currencymodel')
let fund = require('./../models/fundsmodel')
let stock = require('./../models/stock')
let detailStub = sinon.stub(detail, 'find')
let insertStub = sinon.stub(model.prototype, 'save');
let modelStub = sinon.stub(model, 'find');
let findStub = sinon.stub(model.prototype, 'findOne')
let updateStub = sinon.stub(model, 'update');
let currencyStub = sinon.stub(currency, 'find')
let stockStub = sinon.stub(stock, 'find')
let fundStub = sinon.stub(fund, 'find')
let findOneStub = sinon.stub(model, 'findOneAndUpdate')

describe('POST /signup/users', () => {
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
            .post('/signup/users')
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
            .get('/login')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.name).to.be.equal("Pulkit");
                done();
            })
    });
});

describe('GET /findUser/:email', () => {
    it('test find user', (done) => {
        modelStub.yields(null, { name: "Pulkit", password: "Pulkit@123", email: "Pulkit176@gmail.com", mobile: 9799999999 })
        request(App)
            .get('/find/findUser/:email')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(200);
                done();
            })
    })
})

//test case for HTTP Get method for stock price of NASDAQ for WSJ website
describe('get method', () => {
    it('respond with json', (done) => {
        detailStub.yields(null, [{ Code: "100", Company: "abc" }])
        request(App)
            .get('/postNews/details')
            .expect('Content-Type', /json/)

            .end((err, res) => {
                if (err) return done(err);
                expect(res.body[0].Code).to.be.equal("100");
                expect(res.body[0].Company).to.be.equal("abc");
                done();
            });
    });
});

describe('get method for curency', () => {
    it('respond with json', (done) => {
        currencyStub.yields(null, [{
            Time: "22:00",
            Headline: "Headline--",
            News: "News",
            day: "day",
            month: "month",
            year: "year",
        }])
        request(App)
            .get('/postNews/currency')
            .expect('Content-Type', /json/)

            .end((err, res) => {
                if (err) return done(err);
                expect(res.body[0].Time).to.be.equal("22:00");
                expect(res.body[0].Headline).to.be.equal("Headline--");
                done();
            });
    });
});

describe('get method for fund', () => {
    it('respond with json', (done) => {
        fundStub.yields(null, [{
            Time: "time",
            Headline: "Headline",
            News: "News",
            day: "day",
            month: "month",
            year: "year"
        }])
        request(App)
            .get('/postNews/fund')
            .expect('Content-Type', /json/)

            .end((err, res) => {
                if (err) return done(err);
                expect(res.body[0].Time).to.be.equal("time");
                expect(res.body[0].Headline).to.be.equal("Headline");
                done();
            });
    });
});

describe('get method for stock', () => {
    it('respond with json', (done) => {
        stockStub.yields(null, [{
            term: "AABA",
            news: "news",
            day: "day",
            month: "month",
            year: "year",
        }])
        request(App)
            .get('/postNews/news/AABA')
            .expect('Content-Type', /json/)

            .end((err, res) => {
                if (err) return done(err);
                expect(res.body[0].term).to.be.equal("AABA");
                expect(res.body[0].news).to.be.equal("news");
                done();
            });
    });
});

describe('GET of logout', () => {
    it('Testing Logout', (done) => {
        request(App)
            .get('/logout/logout')
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(200)
                done();
            })
    })
})

describe('tweets ', () => {
    it('Testing tweets', (done) => {
        modelStub.yields(null, { name: "Pulkit", password: "Pulkit@123", email: "Pulkit176@gmail.com", mobile: 9799999999 })
        request(App)
            .get('/tweets/user_timeline/admin@gmail.com')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(200);
                done();
            })
    });
});

describe('update user name', () => {
    before(function() {
        updateStub.withArgs({ _email: 'admin@gmail.com' }, { $set: { name: 'TestUser' } })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            })
    })
    it('Testing update Name', function(done) {
        request(App)
            .put('/update/updateName/admin@gmail.com')
            .send({ name: "TestUser" })
            .end(function(err, res) {
                if (err) { return done(err) };
                expect(res.status).to.be.equal(200);
                done();
            })

    })
})

describe('update alternate emailId', () => {
    before(function() {
        updateStub.withArgs({ email: 'admin@gmail.com' }, {
                $set: {
                    name: 'TestUser',
                    mobile: 9278721821,
                    alternateEmail: 'TestUser123@gmail.com'
                }
            })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            })
    })
    it('Testing alternate emailId', function(done) {
        request(App)
            .put('/update/updateUser/admin@gmail.com')
            .send({ name: "TestUser" })
            .end(function(err, res) {
                if (err) { return done(err) };
                expect(res.status).to.be.equal(200);
                done();
            })

    })
})

describe('Delete user', () => {
    it('Testing delete user', (done) => {
        request(App)
            .delete('/update/deleteUser/admin@gmail.com')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(200);
                done()
            })
    })
})

describe('POST /updatePassword/:email', () => {
    it('Testing updatePassword/:email', (done) => {
        request(App)
            .post('/update/updatePassword/admin@gmail.com')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(200);
                done();

            });
    });
});

describe('set Flag', () => {
    before(function() {
        updateStub.withArgs({ email: 'admin@gmail.com' }, {
                $set: {
                    flag: 1
                }
            })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            })
    })
    it('Testing set Flag', function(done) {
        request(App)
            .put('/update/updateUser/admin@gmail.com')
            .send({ flag: 1 })
            .end((err, res) => {
                if (err) { return done(err) };
                expect(res.status).to.be.equal(200);
                done();
            })

    })
})

describe('PUT investment/:email', () => {
    before(function() {
        findOneStub.withArgs({ email: 'admin@gmail.com' }, {
                $set: {
                    preferences: ['test']
                }
            })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            })
    })
    it('Testing set Flag', function(done) {
        request(App)
            .put('/update/updateUser/admin@gmail.com')
            .send({ preferences: ['test'] })
            .end((err, res) => {
                if (err) { return done(err) };
                expect(res.status).to.be.equal(200);
                done();
            })

    })
})

describe('get Data ', () => {
    it('Testing getData', (done) => {
        modelStub.yields(null, { name: "Pulkit", password: "Pulkit@123", email: "admin@gmail.co", mobile: 9799999999 })
        request(App)
            .get('/find/findUser/admin@gmail.com')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(200);
                done();
            })
    });
});


//Negative Test Cases
describe('GET /login/signin/:email/:password', () => {
    it('respond with json', (done) => {
        findStub.withArgs({ 'email': 'Pulkit176@gmail.com', 'password': 'Pulkit@123' })
            .yields(null, {
                name: "Pulkit",
                password: "Pulkit@123",
                email: "Pulkit@gmail.com",
                mobile: 9799999900
            })
        request(App)
            .get('/login/signin/Pulkit176@gmail.com/Pulkit@123')
            .end((err, res) => {
                if (err)
                    return err;
                expect(res.status).to.be.equal(401);
                done();

            })
    })
})

describe('resetPwd ', () => {
    it('Testing Reset Password', (done) => {
        modelStub.yields(null, { name: "Pulkit", password: "Pulkit@123", email: "Pulkit176@gmail.com", mobile: 9799999999 })
        request(App)
            .get('/resetPwd/forgot/admin@gmail.com')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(400);
                done();
            })
    });
});