const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const connection = require("../../src/database/connection");

chai.use(chaiHttp);

const { expect } = chai;

describe("Test Users create profile Route", function () {
  afterEach(sinon.restore);
  describe("POST /new-user", function () {
    describe("sucess case", function () {
      const successTestConfig = {
        testUrl: "/new-user",
        userData: {
          name: "Rafael",
          email: "rafael@mail.com",
          password: 1234,
        },
        expected: {
          status: 201,
          body: {
            id: 1,
            name: "Rafael",
            email: "rafael@mail.com",
          },
        },
      };
      it("should create an user", async function () {
        sinon.stub(connection, "execute").resolves([[{ insertId: 1 }]]);

        const response = await chai
          .request(app)
          .post(successTestConfig.testUrl)
          .send(successTestConfig.userData);
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
