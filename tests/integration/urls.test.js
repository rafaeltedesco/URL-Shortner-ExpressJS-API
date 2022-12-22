const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const connection = require("../../src/database/connection");

const { expect } = chai

describe("GET /urls", function () {
    afterEach(sinon.restore)
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
      it("should show all user's urls", async function () {
        const userData = {
          id: 1,
          name: "Rafael",
          email: "rafael@mail.com",
          iat: 1671567149,
        };
        sinon.stub(jwt, "verify").returns(userData);
        const expectedUrls = [
          {
            id: 7,
            shortned_url: "http://localhost:3000/1234",
            original_url: "http://www.google.com/test",
            created_at: "2022-12-05T21:49:36.000Z",
            user_id: 1
          },
          {
            id: 4,
            shortned_url: "http://localhost:3000/4442",
            originalUrl: "http://www.google.com/dbz",
            createdAt: "2022-10-05T21:49:36.000Z",
            user_id: 1
          },
        ];
       sinon.stub(connection, 'execute').resolves([expectedUrls])
       
        const response = await chai
          .request(app)
          .get(successTestConfig.testUrl)
          .set(successTestConfig.header);

        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(expectedUrls);
      });
      it('should return "user does not have shortned urls yet', async function () {
        const userData = {
          id: 1,
          name: "Rafael",
          email: "rafael@mail.com",
          iat: 1671567149,
        };
        sinon.stub(jwt, "verify").returns(userData);
        successTestConfig.expected.body = {
          message: "user does not have shortned urls yet"
        }
        const response = await chai.request(app)
          .get(successTestConfig.testUrl)
          .set(successTestConfig.header)

        expect(response).to.have.status(404)
        expect(response.body).to.deep.equal(successTestConfig.expected.body)

      })
    });
  });