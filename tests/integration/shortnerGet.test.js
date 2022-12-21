const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const sinon = require("sinon");
const connection = require("../../src/database/connection");

chai.use(chaiHttp);

const { expect } = chai;

describe("Test shortner", function () {
    afterEach(sinon.restore) 
    describe("GET /:id", function () {
    describe("success casse", function () {
      const successTestConfig = {
        expectedResponse: {
          status: 302,
          redirectExpected: "https://www.google.com",
        },
      };

      it("should redirect to original site given a registered url", async function () {
        sinon.stub(connection, "execute").resolves([[
          {
            id: 1,
            shortned_url: "http://localhost:3000/1234",
            original_url: "https://www.google.com",
            user_id: 1,
          },
        ]]);
        const response = await chai.request(app).get("/1234").redirects(0);

        expect(response).to.have.status(
          successTestConfig.expectedResponse.status
        );
        expect(response).to.redirectTo(
          successTestConfig.expectedResponse.redirectExpected
        );
      });
    });
  });
});
