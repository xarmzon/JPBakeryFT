const chai = require('chai')
const wrapper = require('./index')

chai.use(require('chai-as-promised'))
const expect = chai.expect

describe('express-async-wrapper', () => {

  it('should wrap provided function and catch any exceptions', async () => {
    const error = new Error('catch me!')
    return expect(
      wrapper(
        async () => {
          throw error
        }
      )()
    ).to.be.rejectedWith(error)
  })

})
