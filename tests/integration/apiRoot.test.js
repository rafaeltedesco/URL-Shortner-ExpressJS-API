const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp)

const { expect } = chai;

describe('Test API Root Route', function () {
    describe('GET /', function () {
        it('should return http status 200 and object with message "Welcome"', async function () {
            const response = await chai.request(app)
                .get('/')

            expect(response).to.have.status(200)
            expect(response.body).to.deep.equal({message: "Welcome"})
        })
    })
})