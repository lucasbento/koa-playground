var koa = require('koa');
var app = koa();
var parse = require('co-body');

var port = process.argv[2] || 4000;

app.listen(port);

app.use(function* (next) {
  if (this.method === 'POST') {
    var body = yield parse(this);

    if (body.hasOwnProperty('name')) {
      body.name = body.name.toUpperCase();
      this.body = body.name;
    }
  } else if (this.method === 'GET') {
    if (this.path === '/') {
      return this.body = 'hello koa';
    } else if (this.path === '/404') {
      return this.body = 'page not found';
    } else if (this.path === '/500') {
      return this.body = 'internal server error';
    }
  }

  yield next;
});
