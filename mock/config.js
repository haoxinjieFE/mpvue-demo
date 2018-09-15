const jobs = require('./jobs')
const losts = require('./losts')
const driver = require('./driver')

module.exports = {
  'GET /api/jobs': jobs,
  'GET /api/losts': losts,
  'GET /api/driver': driver
}
