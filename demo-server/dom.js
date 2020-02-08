let user = require('./user');
console.log(`user:${user.user}`);
console.log(`user:${user.say()}`);
let http = require('http');
let url = require('url');
let util = require('util');
let server=http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  
  res.end(util.inspect(url.parse("http://127.0.0.1:3000/dom.html?a=123#tap")));

  res.end("hello,node.js")
})
server.listen(3000, '127.0.0.1', () => {
  console.log('服务器连接成功');
  
})