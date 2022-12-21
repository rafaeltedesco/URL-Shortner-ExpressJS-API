const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const sinon = require("sinon");
const connection = require("../../src/database/connection");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

const { expect } = chai;

describe("Test Shortner funcionality", function () {
  describe("POST /short-url", function () {
    const userData = {
      id: 1,
      name: "Rafael",
      email: "rafael@mail.com",
      iat: 1671567149,
    };

    beforeEach(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
      sinon.stub(jwt, "verify").returns(userData);
    });
    afterEach(sinon.restore);
    describe("Success Case", function () {
      const successTestConfig = {
        testURL: "/short-url",
        incomingURL: { url: "https://www.google.com" },
        expectedStatus: 200,
        expectedBody: {
          id: 1,
          shortnedUrl: "http://localhost:3000/1234",
          originalUrl: "https://www.google.com",
        },
        header: {
          Authorization: "Bearer abcd",
        },
      };
      it("should produce a short version of an incoming url", async function () {
        const response = await chai
          .request(app)
          .post(successTestConfig.testURL)
          .set(successTestConfig.header)
          .send(successTestConfig.incomingURL);

        expect(response).to.have.status(successTestConfig.expectedStatus);
        expect(response.body).to.deep.equal(successTestConfig.expectedBody);
      });
    });
    describe("Failure Case", function () {
      const failureTestConfig = {
        testURL: "/short-url",
        incomingURL: {},
        expectedStatus: 400,
        expectedBody: {
          message: '"url" field not found',
        },
        header: {
          Authorization: "Bearer abcd",
        },
      };
      it("should return status 400 when request does not contain a url", async function () {
        const response = await chai
          .request(app)
          .post(failureTestConfig.testURL)
          .set(failureTestConfig.header)
          .send(failureTestConfig.incomingURL);
        expect(response).to.have.status(failureTestConfig.expectedStatus);
        expect(response.body).to.deep.equal(failureTestConfig.expectedBody);
      });
      it("should return status 422 when request contains a url but invalid", async function () {
        failureTestConfig.incomingURL = {
          url: "abcde",
        };
        failureTestConfig.expectedStatus = 422;
        failureTestConfig.expectedBody = {
          message: '"url" invalid',
        };
        const response = await chai
          .request(app)
          .post(failureTestConfig.testURL)
          .set(failureTestConfig.header)
          .send(failureTestConfig.incomingURL);
        expect(response).to.have.status(failureTestConfig.expectedStatus);
        expect(response.body).to.deep.equal(failureTestConfig.expectedBody);
      });
      it("should return http status 401 if token is not provide", async function () {
        failureTestConfig.expectedStatus = 401;
        failureTestConfig.expectedBody = {
          message: '"token" not provided',
        };
        const response = await chai
          .request(app)
          .post(failureTestConfig.testURL)
          .send(failureTestConfig.incomingURL);

        expect(response).to.have.status(failureTestConfig.expectedStatus);
        expect(response.body).to.deep.equal(failureTestConfig.expectedBody);
      });
      it("should return status 401 if token is provide but is not valid", async function () {
        sinon.restore();
        failureTestConfig.expectedBody = {
          message: '"token" invalid',
        };
        const response = await chai
          .request(app)
          .post(failureTestConfig.testURL)
          .set(failureTestConfig.header)
          .send(failureTestConfig.incomingURL);

        expect(response).to.have.status(failureTestConfig.expectedStatus);
        expect(response.body).to.deep.equal(failureTestConfig.expectedBody);
      });
    });
  });
  describe("GET /:id", function () {
    describe("success casse", function () {
      const successTestConfig = {
        expectedResponse: {
          status: 302,
          redirectExpected: 'http://google.com'
        },
      };

      it("should redirect to original site given a registered url", async function () {
        const response = await chai.request(app).get("/1234").redirects(0);

        expect(response).to.have.status(successTestConfig.expectedResponse.status)
        expect(response).to.redirectTo(successTestConfig.expectedResponse.redirectExpected)
      });
    });
  });
});
