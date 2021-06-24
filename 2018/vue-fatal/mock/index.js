const express = require('express');
const bodyParser = require('body-parser');

const logindata = require('./mine/logindata');
const app = express();

app.use((req, res, next) => {
   // 允许哪些网站可以访问
   res.setHeader('Access-Control-Allow-Origin', '*');
   // 允许请求的方法
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   // 允许哪些headers里的自定义字段
   res.setHeader('Access-Control-Allow-Headers', 'xxx-token');
   next();
});

app.use(bodyParser.urlencoded({extended: true}));

//把引入的数据作为中间件传递给express创建的应用
app.use(logindata);

app.listen('6328', () => {
  console.log('mock server is running on localhost:6328')
})