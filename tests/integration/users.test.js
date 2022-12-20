const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");

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
          body: {
            token: "abcd",
          },
        },
      };
      it("should return a token when user login with valid credentials", async function () {
        const response = await chai
          .request(app)
          .post(successTestConfig.testUrl)
          .send(successTestConfig.loginData);
        expect(response).to.have.status(successTestConfig.expected.status);
        expect(response.body).to.deep.equal(successTestConfig.expected.body);
      });
    });
  });

  describe("GET /profile", function () {
    describe("success case", function () {
      it.skip("should return user data", async function () {});
    });
  });
});
