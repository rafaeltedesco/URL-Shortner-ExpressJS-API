const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/app')

chai.use(chaiHttp)

const { expect } = chai

describe('Test Shortner funcionality', function () {
    const testConfig = {
        testURL: '/short-url',
        incomingURL: { url: 'https://www.google.com'},
        expectedStatus: 200,
        expectedBody: {
            id: 1,
            shortned_url: 'http://localhost:3000/1234',
            original_url: 'https://www.google.com'
        }
    }
    describe('POST /short-url', function () {
        it('should produce a short version of an incoming url', async function () {
            const response = await chai.request(app)
                .post(testConfig.testURL)
                .send(testConfig.incomingURL)

            expect(response).to.have.status(testConfig.expectedStatus)
            expect(response.body).to.deep.equal(testConfig.expectedBody)
        })
    })
})