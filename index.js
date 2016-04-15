var app = require('koa')();
var bodyParser = require('koa-bodyparser');
var router = require('koa-router')();
var fs = require('fs');

var port = process.argv[2] || 4000;

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port);

router
  .get('/json', function *() {
    this.body = { foo: 'bar' };
  })
  .get('/stream', function *() {
    var file = process.argv[3];
    this.body = fs.createReadStream(file);
  });
