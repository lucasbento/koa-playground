var koa = require('koa');
var app = koa();

var port = process.argv[2] || 4000;

app.listen(port);

app.use(function* (next) {
  if (this.path === '/') {
    return this.body = 'hello koa';
  } else if (this.path === '/404') {
    return this.body = 'page not found';
  } else if (this.path === '/500') {
    return this.body = 'internal server error';
  }

  yield next;
});
