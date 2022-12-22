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
          status: 201
        },
      };
      it("should create an user and return token", async function () {
        const connectionStub = sinon.stub(connection, "execute")
        connectionStub.onCall(0).resolves([{ insertId: 1 }]);
        connectionStub.onCall(1).resolves([
          [
            {
              id: 1,
              name: "Rafael",
              email: "rafael@mail.com",
              password: 1234,
            },
          ],
        ])

        const response = await chai
          .request(app)
          .post(successTestConfig.testUrl)
          .send(successTestConfig.userData);
        expect(response).to.have.status(successTestConfig.expected.status);
        expect(response.body).to.haveOwnProperty("token");
        expect(response.body.token).to.have.length.greaterThan(3);
      });
    });

    describe('failure case', function () {
      it('should return status 400 when send not valid data', async function () {
        const failureTestConfig = {
          testUrl: '/new-user',
          expect: {
            status: 400,
            body: {
              message: "invalid params"
            },
          },
          send: {
            data: {
            notValid: 123
          }}
        }
        const response = await chai.request(app)
          .post(failureTestConfig.testUrl)
          .send(failureTestConfig.send.data)

        expect(response).to.have.status(failureTestConfig.expect.status)
        expect(response.body).to.deep.equal(failureTestConfig.expect.body)
      })
    })
  });

  describe("GET /profile", function () {
    describe("success case", function () {
      it.skip("should return user data", async function () {});
    });
  });
});
