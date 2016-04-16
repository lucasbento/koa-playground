var app = require('koa')();
// var bodyParser = require('koa-bodyparser');
// var router = require('koa-router')();
// var fs = require('fs');

var port = process.argv[2] || 4000;

app
  // .use(bodyParser())
  // .use(router.routes())
  // .use(router.allowedMethods())
  .use(function* () {
    this.body = (this.request.is('application/json')) ? { message: 'hi!' } : 'ok';
  })
  .listen(port);
