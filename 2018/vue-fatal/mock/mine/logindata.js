const router = require('express').Router();
const Mock = require('mockjs');

const logindata = router.post('/api/v1/logindata', (req, res) => {
  console.log(req.body)
  if(req.body.username) {
    res.json(Mock.mock(
      {
        code: 200,
        username: req.body.username,
        token: '@uuid'
      }
    ))
  } else{
    res.json(Mock.mock(
      {
        code: 401,
        errMsg: 'FAILED'
      }
    ))
  }
})

module.exports = logindata;