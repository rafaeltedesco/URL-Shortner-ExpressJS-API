const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const connection = require("../../src/database/connection");
const bcrypt = require('bcrypt')

chai.use(chaiHttp);

const { expect } = chai;

describe("Test Users Route", function () {
  afterEach(sinon.restore);
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
        sinon.stub(connection, "execute").resolves([
          [
            {
              id: 1,
              name: "Rafael",
              email: "rafael@mail.com",
              password: 'hashedpassword',
            },
          ],
        ]);
        const userData = {
          id: 1,
          name: "Rafael",
          email: "rafael@mail.com",
          iat: 1671567149,
        };
        sinon.stub(jwt, "verify").returns(userData);
        sinon.stub(bcrypt, 'compare').resolves(true)
        const response = await chai
          .request(app)
          .post(successTestConfig.testUrl)
          .send(successTestConfig.loginData);
        expect(response).to.have.status(successTestConfig.expected.status);
        expect(response.body).to.haveOwnProperty("token");
        expect(response.body.token).to.have.length.greaterThan(3);
      });
    });
    describe("failure case", function () {
      it("should return invalid user when user not found", async function () {
        const failureTestConfig = {
          testUrl: "/login",
          loginData: {
            email: "rafael@mail.com",
            password: 1234,
          },
          expected: {
            status: 404,
            body: {
              message: "User not found",
            },
          },
        };
        sinon.stub(connection, 'execute').resolves([[]])
        const response = await chai
          .request(app)
          .post(failureTestConfig.testUrl)
          .send(failureTestConfig.loginData);

        expect(response).to.have.status(failureTestConfig.expected.status);
        expect(response.body).to.deep.equal(failureTestConfig.expected.body);
      });
    });
  });
});
