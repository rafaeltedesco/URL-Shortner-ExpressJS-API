const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const connection = require("../../src/database/connection");

chai.use(chaiHttp);

const { expect } = chai;

describe("Test Users Route", function () {
  afterEach(sinon.restore) 
  describe("POST /login", function () {
    
    describe("sucess case", function () {
      const successTestConfig = {
        testUrl: "/login",
        loginData: {
          email: "rafael@mail.com",
          password: 1234,
        },
        expected: {
          status: 200,
        },
        header: {
          Authorization: "Bearer abcd",
        },
      };
      it("should return a token when user login with valid credentials", async function () {
        sinon.stub(connection, 'execute').resolves([[{
          id: 1,
          name: "Rafael",
          email: "rafael@mail.com",
          password: 1234
        }]])
        const userData = {
          id: 1,
          name: "Rafael",
          email: "rafael@mail.com",
          iat: 1671567149,
        };
        sinon.stub(jwt, "verify").returns(userData);
        const response = await chai
          .request(app)
          .post(successTestConfig.testUrl)
          .set(successTestConfig.header)
          .send(successTestConfig.loginData);
        expect(response).to.have.status(successTestConfig.expected.status);
        expect(response.body).to.haveOwnProperty("token");
        expect(response.body.token).to.have.length.greaterThan(3);
      });
    });
  });

  
  describe("GET /profile", function () {
    describe("success case", function () {
      it.skip("should return user data", async function () {});
    });
  });
});
