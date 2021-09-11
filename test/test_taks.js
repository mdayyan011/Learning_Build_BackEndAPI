let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');


let should = chai.should();
chai.use(chaiHttp);
//expect
//assert 

describe("Login Suite", () => {
    it("Positive Test Case Of 1-1", (done) => {
        let dataset = {
            "mobile": "7773970863",
            "password": "paassPASS123@"
        };
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('customer_id');
                response.body.should.have.property('customer_name');
                response.body.should.have.property('database_id');
                done();
            })
    })

    it("Negative Test Case Of 1-0", (done) => {
        let dataset = {
            "mobile": "7773970863",
            "password": "wrongPass12"
        };
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('status').eql('error');
                response.body.should.have.property('mssg').eql('User id and Password doesnot match');
                response.body.should.not.have.property('customer_id');
                response.body.should.not.have.property('customer_name');
                response.body.should.not.have.property('database_id');
                done();
            })
    })

    it("Negative Test Case Of 0-1", (done) => {
        let dataset = {
            "mobile": "0000123",
            "password": "paassPASS123@"
        };
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('status').eql('error');
                response.body.should.have.property('mssg').eql('User id and Password doesnot match');
                response.body.should.not.have.property('customer_id');
                response.body.should.not.have.property('customer_name');
                response.body.should.not.have.property('database_id');
                done();
            })
    })

    it("Negative Test Case Of 0-0", (done) => {
        let dataset = {
            "mobile": "0000123",
            "password": "paass"
        };
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err, response) => {
                response.should.have.status(200);response.body.should.be.a('object');
                response.body.should.have.property('status').eql('error');
                response.body.should.have.property('mssg').eql('User id and Password doesnot match');                
                response.body.should.not.have.property('customer_id');
                response.body.should.not.have.property('customer_name');
                response.body.should.not.have.property('database_id');
                done();
            })
    })

    it("Negative Test Case Of Blank-0", (done) => {
        let dataset = {
            "mobile": "",
            "password": "passPass123@"
        }
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('status').eql('error');
                response.body.should.have.property('mssg').eql('Please enter mobile number to login');
                response.body.should.not.have.property('customer_id');
                response.body.should.not.have.property('customer_name');
                response.body.should.not.have.property('database_id');
            done();
            })
    })

    it("Negative Test Case Of 0-Blank", (done) => {
        let dataset = {
            "mobile": "1234",
            "password": ""
        }
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('status').eql('error');
                response.body.should.have.property('mssg').eql('Please enter password to login');
                response.body.should.not.have.property('customer_id');
                response.body.should.not.have.property('customer_name');
                response.body.should.not.have.property('database_id');
            done();
            })
    })

    it("Negative Test Case Of Blank-1", (done) => {
        let dataset = {
            "mobile": "",
            "password": "paassPASS123@"
        }
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('status').eql('error');
                response.body.should.have.property('mssg').eql('Please enter mobile number to login');
                response.body.should.not.have.property('customer_id');
                response.body.should.not.have.property('customer_name');
                response.body.should.not.have.property('database_id');
            done();
            })
    })

    it("Negative Test Case Of 1-Blank", (done) => {
        let dataset = {
            "mobile": "7773970863",
            "password": ""
        }
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('status').eql('error');
                response.body.should.have.property('mssg').eql('Please enter password to login');
                response.body.should.not.have.property('customer_id');
                response.body.should.not.have.property('customer_name');
                response.body.should.not.have.property('database_id');
            done();
            })
    })

    it("Negative Test Case Of Blank-Blank", (done) => {
        let dataset = {
            "mobile": "",
            "password": ""
        }
        chai.request(server)
            .post('/login')
            .send(dataset)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('status').eql('error');
                response.body.should.have.property('mssg').eql('Please enter mobile number to login');
                response.body.should.not.have.property('customer_id');
                response.body.should.not.have.property('customer_name');
                response.body.should.not.have.property('database_id');
            done();
            })
    })
})
