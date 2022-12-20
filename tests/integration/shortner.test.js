const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/app')

chai.use(chaiHttp)

const { expect } = chai

describe('Test Shortner funcionality', function () {
    describe('POST /short-url', function () {
        describe('Success Case', function () {
            const successTestConfig = {
                testURL: '/short-url',
                incomingURL: { url: 'https://www.google.com'},
                expectedStatus: 200,
                expectedBody: {
                    id: 1,
                    shortned_url: 'http://localhost:3000/1234',
                    original_url: 'https://www.google.com'
                }
            }
            it('should produce a short version of an incoming url', async function () {
                const response = await chai.request(app)
                    .post(successTestConfig.testURL)
                    .send(successTestConfig.incomingURL)
    
                expect(response).to.have.status(successTestConfig.expectedStatus)
                expect(response.body).to.deep.equal(successTestConfig.expectedBody)
            })
        })
        describe('Failure Case', function () {
            const failureTestConfig = {
                testURL: '/short-url',
                incomingURL: { },
                expectedStatus: 400,
                expectedBody: {
                    message: '"url" field not found'
                }
            }
            it('should return status 400 when request does not contain a url', async function () {
                const response = await chai.request(app)
                    .post(failureTestConfig.testURL)
                    .send(failureTestConfig.incomingURL)
                expect(response).to.have.status(failureTestConfig.expectedStatus)
                expect(response.body).to.deep.equal(failureTestConfig.expectedBody)
            })
            it('should return status 422 when request contains a url but invalid', async function () {
                failureTestConfig.incomingURL = {
                    url: 'abcde'
                }
                failureTestConfig.expectedStatus = 422
                failureTestConfig.expectedBody = {
                    message: '"url" invalid'
                }
                const response = await chai.request(app)
                    .post(failureTestConfig.testURL)
                    .send(failureTestConfig.incomingURL)
                expect(response).to.have.status(failureTestConfig.expectedStatus)
                expect(response.body).to.deep.equal(failureTestConfig.expectedBody)
            })
        })
    })
})