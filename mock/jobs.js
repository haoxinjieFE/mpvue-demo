const Mock = require('mockjs')
const Random = Mock.Random

module.exports = {
  'data|1-66': [
    {
      'id|+1': 1,
      'name': '@ctitle()',
      'price': '@integer(70, 200)',
      'place': () => `${Random.city()}-${Random.county()}`,
      'expected_num': '@integer(10, 20)',
      'apply_num': '@integer(10, 20)',
      'introduction': '@csentence(10, 20)',
      'isApply': false,
      'isDone': '@boolean()'
    }
  ],
  total: 66
}
