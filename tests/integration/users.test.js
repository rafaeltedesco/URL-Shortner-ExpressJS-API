const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

const { expect } = chai;

describe("Test Users Route", function () {
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

  describe("GET /urls", function () {
    describe("success case", function () {
      const successTestConfig = {
        testUrl: "/urls",
        expected: {
          status: 200,
        },
        header: {
          Authorization: "Bearer abcd",
        },
      };
      it.skip("should show all user's urls", async function () {
        const expectedUrls = [
          {
            id: 7,
            shortnedUrl: "http://localhost:3000/1234",
            originalUrl: "http://www.google.com/test",
            createdAt: "2022-12-05",
          },
          {
            id: 4,
            shortnedUrl: "http://localhost:3000/1234",
            originalUrl: "http://www.google.com/test",
            createdAt: "2022-10-05",
          },
        ];
       
        const response = await chai
          .request(app)
          .get(successTestConfig.testUrl)
          .set(successTestConfig.header);

        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(expectedUrls);
      });
    });
  });
  describe("GET /profile", function () {
    describe("success case", function () {
      it.skip("should return user data", async function () {});
    });
  });
});
