const Mock = require('mockjs')
const Random = Mock.Random

module.exports = {
  'total': 10,
  'limit': 20,
  'page|+1': 1,
  'data|3': [
    {
      'id|+1': 1,
      'name': '@ctitle()',
      'url': 'http://img1.imgtn.bdimg.com/it/u=92660268,3265807957&fm=200&gp=0.jpg',
      'place': () => `${Random.city()}-${Random.county()}`,
      'introduction': '@csentence(10, 20)',
      'isApply': false
    }
  ]
}
